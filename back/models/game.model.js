const mongoose = require("mongoose");
const { Schema } = mongoose;

const GameSchema = new Schema({
    puntos: {type: String},
    user: {type: String},
    segundos: {type: String},
    fecha: {type: String},
});

module.exports = mongoose.model("Game", GameSchema);
