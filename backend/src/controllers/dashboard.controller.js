const createError = require("http-errors");
const User = require("../models/user.modal");

const getOnlineUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
};

const sendInvite = async (req, res, next) => {
  try {
    res.send("Invite send");
  } catch (error) {
    next(error);
  }
};

const acceptInvite = async (req, res, next) => {
  try {
    res.send("Invite accepted");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOnlineUsers,
  sendInvite,
  acceptInvite,
};
