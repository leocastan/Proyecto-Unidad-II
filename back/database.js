const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/TriviaKids";

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("La aplicacion fue conectada a la BDD - Ojala no falle lo demas :'<"))
  .catch((err) => console.error(err));

module.exports = mongoose;