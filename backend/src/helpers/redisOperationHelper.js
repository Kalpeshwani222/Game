const client = require("../db/init_redis");

const getInvite = async (inviteId) => {
  try {
    const data = await client.hGetAll(inviteId); // Use hGetAll to get all fields of the hash
    console.log(data);

    return Object.keys(data).length > 0 ? data : null; // Return null if no data found
  } catch (error) {
    console.error("Error fetching invite from Redis:", error);
    return null; // Return null on error
  }
};

const deleteInvite = async (invitedId) => {
  try {
    await client.del(invitedId);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getInvite,
  deleteInvite,
};
