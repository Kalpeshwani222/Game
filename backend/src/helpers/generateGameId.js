const crypto = require("crypto");

const generateGameId = (senderId, receiverId) => {
  const uniqueString = `${senderId}:${receiverId}:${Date.now()}`;
  return `game:${crypto.createHash("sha256").update(uniqueString).digest("hex")}`;
};

module.exports = { generateGameId };
