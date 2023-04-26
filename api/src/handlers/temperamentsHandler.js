const syncTemperaments = require("../controllers/temperamentsController");

const getTemperaments = async (req, res) => {
  try {
    res.status(200).send(await syncTemperaments());
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

module.exports = getTemperaments;
