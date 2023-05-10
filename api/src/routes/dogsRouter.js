const { Router } = require("express");
const dogsRouter = Router();
const {
  getDogsHandler,
  getDogByIdHandler,
  createDogHandler,
} = require("../handlers/dogsHandlers");

dogsRouter.get("/", getDogsHandler);

dogsRouter.get("/:id", getDogByIdHandler);

dogsRouter.post("/", createDogHandler);

module.exports = dogsRouter;
