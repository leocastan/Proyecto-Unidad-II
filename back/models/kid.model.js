const mongoose = require("mongoose");
const { Schema } = mongoose;

const KidSchema = new Schema({
    k_nombre: {type: String, required:true},
    k_edad: {type: String, required:true},
    k_profesor: {type: String, required:true},
    k_foto: {type: String, required:true},
});

module.exports = mongoose.model("Kid", KidSchema);
