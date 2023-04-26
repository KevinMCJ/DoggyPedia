const {
  getAllDogs,
  getDogById,
  getDogsByName,
  createDog
} = require("../controllers/dogsController");

const getDogsHandler = async (req, res) => {
  try {
    const { name } = req.query;
    name
      ? res.status(200).json(await getDogsByName(name))
      : res.status(200).json(await getAllDogs());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDogByIdHandler = async (req, res) => {
  try {
    const { idRaza } = req.params;
    res.status(200).json(await getDogById(idRaza));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createDogHandler = async (req, res) => {
  try {
    const { name, height, weight, life_span, image, temperaments} = req.body;
    res
      .status(200)
      .json(await createDog({ name, height, weight, life_span, image, temperaments }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getDogsHandler, getDogByIdHandler, createDogHandler};
