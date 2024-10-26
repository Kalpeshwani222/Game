const express = require("express");
const router = express.Router();

const { getOnlineUsers } = require("../controllers/dashboard.controller");

router.route("/online-users").get(getOnlineUsers);

module.exports = router;
