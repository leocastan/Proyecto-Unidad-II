const express = require("express");
const router = express.Router();

const kid = require("../controllers/kid.controller");

router.get("/get/:profesor", kid.getKids);

module.exports = router;