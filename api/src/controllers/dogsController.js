require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");

const { Dog, Temperament } = require("../db");
const REGEX_NUMBERS = /(\d+(\.\d+)?)/g;
const REGEX_STRINGS_COMMA = /,\s*/
const endpoint = "https://api.thedogapi.com/v1/breeds?api_key=" + API_KEY;


const getApiDogs = async () => {
  const { data } = await axios.get(endpoint);

  const filteredData = data.map(
    ({ id, name, weight, height, life_span, temperament, image }) => {
      let finalWeight = weight.imperial;
      let finalHeight = height.imperial;
      let finalTemperament = []; 
      let finalLifeSpan = life_span; 

      // * Encuentra los números(enteros o flotantes) y guarda las coincidencias en un array ["5", "6"] luego los transformo a números.
      if (finalWeight) finalWeight = finalWeight.match(REGEX_NUMBERS).map((n) => Number(n));

      if (finalHeight) finalHeight = finalHeight.match(REGEX_NUMBERS).map((n) => Number(n));

      if(finalLifeSpan) finalLifeSpan = finalLifeSpan.match(REGEX_NUMBERS).map((n) => Number(n));

      if (temperament) finalTemperament = temperament.split(REGEX_STRINGS_COMMA).map((t) => t.trim());

      // * Hay 4 razas sin temperament(undefined). En este caso quedarían con temperament = []
      return {
        id,
        name,
        weight: finalWeight,
        height: finalHeight,
        life_span: finalLifeSpan,
        temperament: finalTemperament,
        image: image?.url,
        origin: "api",
      };
    }
  );

  return filteredData;
};

const getDogsDB = async () => {
  const dogsDB = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const cleanDogs = dogsDB.map((dog) => ({
    id: dog.id,
    name: dog.name,
    height: dog.height,
    weight: dog.weight,
    life_span: dog.life_span,
    image: dog.image,
    temperament: dog.Temperaments.map((temp) => temp.name),
    origin: "created",
  }));

  return cleanDogs;
};

const getAllDogs = async () => {
  const dogsApi = await getApiDogs();
  const dogsDB = await getDogsDB();

  return [...dogsApi, ...dogsDB];
};

/******************************************************/
// * FUNCIONA PARA UUID Y ID
const getDogById = async (id) => {
  if (!id) throw Error("Invalid id");

  //Si es un numero [No es de tipo UUID]
  if (Number(id)) id = parseInt(id);

  const allDogs = await getAllDogs();
  const dog = allDogs.find((dog) => dog.id === id);

  if (!dog) throw Error("No se encontró una raza con ese ID");

  return dog;
};

/*****************************************************/
const getDogsByName = async (name) => {
  if (!name || typeof name !== "string") throw Error("Nombre invalido");

  name = name.trim(); // * Elimina cualquier espacio en blanco adicional antes o después del string.

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
  temperament,
}) => {
  if (!name || !height || !weight || !life_span) {
    throw Error("Faltan datos requeridos");
  }

  if (
    !Array.isArray(height) ||
    !Array.isArray(weight) ||
    height.length !== 2 ||
    weight.length !== 2
  ) {
    throw Error("Invalid height or weight format");
  }

  const newDog = await Dog.create({
    name,
    height,
    weight,
    life_span,
    image,
  });

  if (temperament) {
    // * Puede no tener temperamentos.
    const temperamentsToAdd = await Temperament.findAll({
      where: { name: temperament },
    });

    await newDog.addTemperament(temperamentsToAdd);
  }

  return newDog;
};

module.exports = { getAllDogs, getApiDogs, getDogsDB, getDogById, getDogsByName, createDog };
