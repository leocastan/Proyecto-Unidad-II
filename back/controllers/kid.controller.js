const Kid = require("../models/kid.model");

const KidCtrl = {};

KidCtrl.getKids = async (req, res, next) => {
  const { profesor } = req.params
  const user = await Kid.find({k_profesor:profesor});
  res.json(user);
};

module.exports = KidCtrl;

