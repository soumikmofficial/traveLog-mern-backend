const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  verifyEmail,
} = require("../controllers/authController");

router.route("/register").post(register);
router.route("/verify-email").post(verifyEmail);
router.route("/login").post(login);
router.route("/logout").delete(logout);

module.exports = router;
