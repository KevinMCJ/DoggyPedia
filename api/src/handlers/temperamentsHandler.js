const syncTemperaments = require("../controllers/temperamentsController");

const getTemperaments = async (req, res) => {
  try {
    res.status(200).send(await syncTemperaments());
  } catch (error) {
    res.status(error.statusCode || 500).json({[error.name]: error.message});
  }
};

module.exports = getTemperaments;
