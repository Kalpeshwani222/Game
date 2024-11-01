const createError = require("http-errors");
const User = require("../models/user.modal");
const redisClient = require("../db/init_redis");
const { io } = require("../app");

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
    const { senderId, receiverId, coins } = req.body;

    if (!senderId || !receiverId || !coins) {
      throw createError.BadRequest("Missing required invite information");
    }

    const sender = await User.findById(senderId, "firstName lastName");
    if (!sender) {
      throw createError.NotFound("Sender not found");
    }

    const inviteId = `invite:${senderId}:${receiverId}`;

    // Store invitation in Redis with TTL (e.g., 5 mins)
    await redisClient.hSet(inviteId, {
      senderId,
      receiverId,
      coins,
      timestamp: Date.now(),
    });
    await redisClient.expire(inviteId, 300); // Expire in 5 minutes
    const io = req.app.get("io");
    if (!io) throw createError.InternalServerError("Socket.IO not initialized");

    // Emit real-time notification to the receiver
    io.to(receiverId).emit("new-invite", {
      // senderId,
      senderName: `${sender.firstName} ${sender.lastName}`,
      coins,
      message: "You have a new game invitation!",
    });

    res.status(200).json({ message: "Invitation sent successfully" });
  } catch (error) {
    next(error);
  }
};

const acceptInvite = async (req, res, next) => {
  try {
    res.send("Accepted send");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOnlineUsers,
  sendInvite,
  acceptInvite,
};
