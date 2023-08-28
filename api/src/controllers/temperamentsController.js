require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");

const { Temperament } = require("../db");
const endpoint = "https://api.thedogapi.com/v1/breeds?api_key=" + API_KEY;

const syncTemperaments = async () => {
  const count = await Temperament.count();
  let allTemps = [];

  // ? Si hay temperamentos en la BD los obtiene de ahi, si no, usa la API y los carga en la BD.
  if (count) {
    const temperaments = await Temperament.findAll();
    allTemps = temperaments.map(temp => temp.name);
  } else {
    const { data } = await axios.get(endpoint);
    let dogTemps;

    if(!data) throw new Error("Couldn't get temperament data from API.");

    data.forEach((dog) => {
      if (dog.temperament) {
        dogTemps = dog.temperament.split(", ");

        for (let temp of dogTemps) {
          // * Para no guardar repetidos
          if (!allTemps.includes(temp)) allTemps.push(temp);
        }
      }
    });

    allTemps.sort(); // * Ordenar los temperamentos alfabéticamente

    allTemps.forEach(async (temp) => {
      await Temperament.create({
        name: temp,
      });
    });
  }

  return allTemps;
};

module.exports = syncTemperaments;
