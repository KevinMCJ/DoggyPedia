require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");

const { Temperament } = require("../db");
const endpoint = "https://api.thedogapi.com/v1/breeds?api_key=" + API_KEY;

const syncTemperaments = async () => {
  const { data } = await axios.get(endpoint);
  const allTemps = [];
  let dogTemps;

  data.forEach((dog) => {
    if (dog.temperament) {
      dogTemps = dog.temperament.split(", ");

      for (let temp of dogTemps) {
        // * Para no guardar repetidos
        if (!allTemps.includes(temp)) allTemps.push(temp);
      }
    }
  });

  // * Para cargar la BDD solo una vez.
  !allTemps.length && allTemps.forEach(async (temp) => {
    await Temperament.create({
      name: temp,
    });
  });

  return allTemps;
};

module.exports = syncTemperaments;
