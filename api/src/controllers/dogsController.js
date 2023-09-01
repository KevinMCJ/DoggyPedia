require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");

const { Dog, Temperament } = require("../db");
const { ValidationError, ServiceError, NotFoundError } = require("../errors");
const REGEX_NUMBERS = /(\d+(\.\d+)?)/g;
const REGEX_STRINGS_COMMA = /,\s*/;
const endpoint = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

const getApiDogs = async () => {
  try {
    const { data } = await axios.get(endpoint);

    const filteredData = data.map(
      ({ id, name, weight, height, life_span, temperament, image }) => {
        let finalWeight = weight.imperial;
        let finalHeight = height.imperial;
        let finalTemperament = [];
        let finalLifeSpan = life_span;

        // * Encuentra los números(enteros o flotantes) y guarda las coincidencias en un array ["5", "6"] luego los transformo a números.
        if (finalWeight)
          finalWeight = finalWeight.match(REGEX_NUMBERS).map((n) => Number(n));

        if (finalHeight)
          finalHeight = finalHeight.match(REGEX_NUMBERS).map((n) => Number(n));

        if (finalLifeSpan)
          finalLifeSpan = finalLifeSpan
            .match(REGEX_NUMBERS)
            .map((n) => Number(n));

        if (temperament)
          finalTemperament = temperament
            .split(REGEX_STRINGS_COMMA)
            .map((t) => t.trim());

        // * Hay 4 razas sin temperament(undefined). En este caso quedarían con temperament = []
        return {
          id,
          name,
          weight: finalWeight,
          height: finalHeight,
          life_span: finalLifeSpan,
          temperament:
            finalTemperament.length > 0 ? finalTemperament : ["Unknown"],
          image:
            image?.url ||
            "https://static4.depositphotos.com/1011415/285/v/600/depositphotos_2855252-stock-illustration-little-jack-russel.jpg",
          origin: "api",
        };
      }
    );

    return filteredData;
  } catch (error) {
    throw new ServiceError("Couldn't get breeds from API");
  }
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
  if (!id) throw new ValidationError("Invalid id provided");

  //Si es un numero [No es de tipo UUID]
  if (Number(id)) id = parseInt(id);

  const allDogs = await getAllDogs();
  const dog = allDogs.find((dog) => dog.id === id);

  if (!dog) throw new NotFoundError("No se encontró una raza con ese ID")

  return dog;
};

/*****************************************************/
const getDogsByName = async (name) => {
  if (!name || typeof name !== "string") throw new ValidationError("Nombre invalido");

  name = name.trim(); // * Elimina cualquier espacio en blanco adicional antes o después del string.

  const allDogs = await getAllDogs();
  const dogs = allDogs.filter((dog) => {
    return dog.name.toLowerCase().includes(name.toLowerCase());
  });

  return dogs;
};

/******************************************************/
const createDog = async ({
  name,
  height,
  weight,
  life_span,
  image,
  temperament,
}) => {
  if (!name || !height || !weight || !life_span || !temperament) {
    throw new ValidationError("Faltan datos requeridos");
  }

  if (
    !Array.isArray(height) ||
    !Array.isArray(weight) ||
    height.length !== 2 ||
    weight.length !== 2
  ) {
    throw new ValidationError("Invalid height or weight format");
  }

  const newDog = await Dog.create({
    name,
    height,
    weight,
    life_span,
    image,
  });

  const temperamentsToAdd = await Temperament.findAll({
    where: { name: temperament },
  });

  await newDog.addTemperament(temperamentsToAdd);

  return { ...newDog.dataValues, temperament };
};

module.exports = {
  getAllDogs,
  getApiDogs,
  getDogsDB,
  getDogById,
  getDogsByName,
  createDog,
};
