const {
  getAllDogs,
  getApiDogs,
  getDogsDB,
  getDogById,
  getDogsByName,
  createDog,
} = require("../controllers/dogsController");

const getDogsHandler = async (req, res) => {
  try {
    const { name } = req.query;
    const dogs = name ? await getDogsByName(name) : await getAllDogs();
    res.status(200).json(dogs);
  } catch (error) {
    res.status(error.statusCode || 500).json({[error.name]: error.message});
  }
};

const getDogByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const dog = await getDogById(id);
    res.status(200).json(dog);
  } catch (error) {
    res.status(error.statusCode || 500).json({[error.name]: error.message});
  }
};

const createDogHandler = async (req, res) => {
  try {
    const { name, height, weight, life_span, image, temperament } = req.body;
    const newDog = await createDog({name, height, weight, life_span, image, temperament});
    res.status(201).json(newDog);
  } catch (error) {
    res.status(error.statusCode || 500).json({[error.name]: error.message});
  }
};

module.exports = { getDogsHandler, getDogByIdHandler, createDogHandler };
