const createError = require("http-errors");
const User = require("../models/user.modal");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../helpers/jwt_helper");

const client = require("../db/init_redis");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw createError.BadRequest();

    const alreadyExist = await User.findOne({ email: email });
    if (alreadyExist) {
      throw createError.Conflict(`${email} is already exists`);
    }

    const user = new User({ email, password });
    const saveUser = await user.save();
    const accessToken = await signAccessToken(saveUser.id);
    const refreshToken = await signRefreshToken(saveUser.id);
    res.send({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) throw createError.NotFound("User not found");
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) throw createError.Unauthorized("Username/password not valid");

    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);

    console.log(accessToken);
    console.log(refreshToken);

    res.send({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) throw createError.BadRequest();

    const userId = await verifyRefreshToken(refreshToken);
    const accessToken = await signAccessToken(userId);
    const refToken = await signRefreshToken(userId);
    res.send({ accessToken: accessToken, refreshToken: refToken });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();

    const userId = await verifyRefreshToken(refreshToken);
    const val = await client.DEL(userId);
    console.log(val);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  refreshToken,
  logout,
};
