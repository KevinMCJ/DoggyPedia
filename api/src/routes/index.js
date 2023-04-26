const { Router } = require("express");
const dogsRouter = require("./dogsRouter");
const temperamentsRouter = require("./temperamentsRouter");
const router = Router();

// * RUTAS
router.use("/dogs", dogsRouter);
router.use("/temperaments", temperamentsRouter);

module.exports = router;
