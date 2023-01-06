const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  const isPasswordCorrect = await user.comparePasswords(password);
  if (!user) {
    throw new UnauthenticatedError("Wrong user cridentials");
  }
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Wrong user cridentials");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
