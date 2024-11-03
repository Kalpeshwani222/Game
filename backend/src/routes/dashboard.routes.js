const express = require("express");
const router = express.Router();

const {
  getOnlineUsers,
  sendInvite,
  acceptInvite,
} = require("../controllers/dashboard.controller");
const { VerifyAccessToken } = require("../middlewares/auth.middleware");

router.route("/online-users").get(getOnlineUsers);
router.route("/invite").post(sendInvite);
router.route("/accept-invite").post(VerifyAccessToken, acceptInvite);
// router.route("/reject-invite").post();

module.exports = router;
