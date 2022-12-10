const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  const token = user.createJWT();
  console.log(token)
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  console.log("login user");
};

module.exports = { register, login };
