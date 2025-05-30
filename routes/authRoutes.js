const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticate = require("../middlewares/auth.js");

// Register user and send OTP
router.post("/signup", authController.signup);

// Verify OTP
router.post("/verify-email", authController.verifyEmail);

// Login
router.post("/login", authController.login);

router.get("/verify",authenticate.authenticate, authController.verifyUser);

module.exports = router;