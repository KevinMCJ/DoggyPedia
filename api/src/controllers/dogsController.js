require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");

const { Dog, Temperament } = require("../db");
const endpoint = "https://api.thedogapi.com/v1/breeds?api_key=" + API_KEY;

const getApiDogs = async () => {
  const { data } = await axios.get(endpoint);

  const filteredData = data.map(
    ({ id, name, weight, height, life_span, temperament, image }) => {
      let finalWeigth = weight.metric;
      let finalHeight = height.metric;
      let finalTemperament = temperament;
      let lifeSpanArr = life_span.match(/\d+/g).map((n) => parseInt(n)); // *  RegEx devuelve array de enteros y despues parseo los valores.

      // * Solo realiza la transformacion correspondiente ej [10,15] si es posible (Algunos vienen NaN).
      if (/\d+/.test(weight.metric)) {
        finalWeigth = finalWeigth.split(" - ").map((n) => parseInt(n));
      }
      if (/\d+(\.\d+)?/.test(height.metric)) {
        finalHeight = finalHeight.split(" - ").map((f) => parseFloat(f));
      }

      if (temperament) finalTemperament = temperament.split(", ");

      // * Hay 4 razas sin temperaments. En este caso no se envia temperament ya que = undefined.
      return {
        id,
        name,
        weight: finalWeigth,
        height: finalHeight,
        life_span: lifeSpanArr,
        temperament: finalTemperament,
        image: image.url,
      };
    }
  );

  return filteredData;
};

const getDogsDB = async () => await Dog.findAll();

const getAllDogs = async () => {
  const dogsApi = await getApiDogs();
  const dogsDB = await getDogsDB();

  return [...dogsApi, ...dogsDB];
};

/******************************************************/
// * FUNCIONA PARA UUID Y ID
const getDogById = async (id) => {
  if(!id) throw Error("Invalid id");

  //Si es un numero [No es de tipo UUID]
  if(Number(id)) id = parseInt(id);

  const allDogs = await getAllDogs();
  const dog = allDogs.filter(dog => dog.id === id);

  if (!dog) throw Error("No se encontro una raza con ese ID");

  return dog;
};

/*****************************************************/
const getDogsByName = async (name) => {
  if (!name || typeof name !== "string") throw Error("Nombre invalido");

  name = name.trim(); // * Elimina cualquier espacio en blanco adicional antes o despues del string.

  const allDogs = await getAllDogs();
  const dogs = allDogs.filter((dog) => {
    return dog.name.toLowerCase().includes(name.toLowerCase());
  });

  if (!dogs.length)
    throw Error("No se encontraron razas de perros con ese nombre");

  return dogs;
};

/******************************************************/
// ! ANDA BIEN.. PERO SIENTO QUE NECESITA MAS VALIDACIONES.
const createDog = async ({
  name,
  height,
  weight,
  life_span,
  image,
  temperaments,
}) => {
  if (!name || !height || !weight || !life_span || !image) {
    throw Error("Faltan datos requeridos");
  }

  if(!Array.isArray(height) || !Array.isArray(weight) 
  || height.length !== 2 || weight.length !== 2 ){
    throw Error("Invalid height or weight format");
  }

  const newDog = await Dog.create({
    name,
    height,
    weight,
    life_span,
    image,
  });

  const temperamentsToAdd = await Temperament.findAll({
    where: { name: temperaments },
  });

  await newDog.addTemperament(temperamentsToAdd);

  return newDog;
};

module.exports = { getAllDogs, getDogById, getDogsByName, createDog };
