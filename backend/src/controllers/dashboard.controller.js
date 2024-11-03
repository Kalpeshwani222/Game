const createError = require("http-errors");
const User = require("../models/user.modal");
const redisClient = require("../db/init_redis");
const { io } = require("../app");
const { getInvite, deleteInvite } = require("../helpers/redisOperationHelper");
const { generateGameId } = require("../helpers/generateGameId");

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
      inviteId,
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
    const receiverId = req.user; //login userID
    const { inviteId } = req.body; //invitedId

    const inviteData = await getInvite(inviteId);

    if (!inviteData)
      throw createError.NotFound("Invalid Invitation, please send again");

    const { senderId, coins } = inviteData;

    //DB CALL

    const [sender, receiver] = await Promise.all([
      User.findById(senderId),
      User.findById(receiverId),
    ]);

    if (!sender || !receiver) {
      return createError.NotFound("Sender or receiver not found");
    }

    //check both user balance
    if (sender.coins < coins || receiver.coins < coins) {
      throw createError.BadRequest("Insufficient balance");
    }

    //deduct the coins into both users
    sender.coins = sender.coins - coins;
    receiver.coins = receiver.coins - coins;
    await sender.save();
    await receiver.save();

    const totalCoins = coins * 2;

    //create the game state in the redis
    const gameId = generateGameId(senderId, receiverId);

    const gameBoard = Array(3).fill(Array(3).fill(null));
    const gameState = {
      board: JSON.stringify(gameBoard),
      // players: { senderId, receiverId },
      players: JSON.stringify({ senderId, receiverId }),
      currentTurn: senderId,
      coins: totalCoins,
      status: "ongoing",
      round: 1,
      totalRounds: 3,
      // scores: { [senderId]: 0, [receiverId]: 0 },
      scores: JSON.stringify({ [senderId]: 0, [receiverId]: 0 }),
      timestamp: Date.now(),
    };
    await redisClient.hSet(gameId, gameState);
    //end

    //remove the invitation
    await deleteInvite(inviteId);

    const io = req.app.get("io");
    if (!io) throw createError.InternalServerError("Socket.IO not initialized");

    io.to(senderId).emit("invite-accepted", {
      receiverId,
      totalCoins,
      message:
        "Your game invitation has been accepted! Redirecting to the game...",
    });

    io.to(receiverId).emit("start-game", {
      opponentId: senderId,
      totalCoins,
      gameId,
      message: "Starting the game!",
    });
    io.to(senderId).emit("start-game", {
      opponentId: receiverId,
      totalCoins,
      gameId,
      message: "Starting the game!",
    });

    res.status(200).json({ message: "Invitation accepted, game starting!" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getOnlineUsers,
  sendInvite,
  acceptInvite,
};
