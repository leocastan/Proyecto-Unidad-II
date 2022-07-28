const Game = require("../models/game.model");

const gameCtrl = {};

gameCtrl.saveGame = async (req, res, next) => {
    const game = new Game({
      puntos: req.body.puntos,
      user: req.body.user,
      segundos: req.body.segundos,
      fecha: req.body.fecha
    });
    await game.save();
    res.json({ status: "game_saved" });
  };

gameCtrl.getAll = async (req, res, next) => {
    const user = await Game.find();
    res.json(user);
  };

module.exports = gameCtrl;
