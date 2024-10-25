const express = require("express");
const router = express.Router();
const {
  register,
  login,
  refreshToken,
  logout,
} = require("../controllers/auth.controller");

router.route("/register").post(register);
router.route("/login").post(login);

router.route("/refresh-token").post(refreshToken);

router.route("/logout").delete(logout);

module.exports = router;
