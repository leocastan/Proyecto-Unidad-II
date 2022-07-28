const express = require("express");
const router = express.Router();

const game = require("../controllers/game.controller");

router.post("/add/", game.saveGame);

router.get("/get/", game.getAll);

module.exports = router;