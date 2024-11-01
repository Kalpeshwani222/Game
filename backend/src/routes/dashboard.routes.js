const express = require("express");
const router = express.Router();

const {
  getOnlineUsers,
  sendInvite,
} = require("../controllers/dashboard.controller");

router.route("/online-users").get(getOnlineUsers);
router.route("/invite").post(sendInvite);

module.exports = router;
