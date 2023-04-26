const { Router } = require("express");
const temperamentsRouter = Router();
const getTemperaments = require("../handlers/temperamentsHandler");

temperamentsRouter.get("/", getTemperaments);

module.exports = temperamentsRouter;
