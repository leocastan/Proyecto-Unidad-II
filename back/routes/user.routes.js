const express = require("express");
const router = express.Router();

const user = require("../controllers/user.controller");

router.get("/get/:username/:password", user.signin);


module.exports = router;