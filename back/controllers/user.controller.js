const User = require("../models/user.model");

const UserCtrl = {};

UserCtrl.signin = async (req, res, next) => {
  const { username, password } = req.params
  const user = await User.find({username:username, password:password});
  res.json(user);
};

module.exports = UserCtrl;

