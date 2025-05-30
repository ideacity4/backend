const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

const express = require("express");
const router = express.Router();

exports.signup = async (req, res) => {
  try {
    const { email, password, role, name } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create unverified user

    // user = new User({ email, password: hashedPassword, isVerified: false });
    // const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    // const otp = new OTP({ email, code: otpCode, expiresAt: Date.now() + 10 * 60 * 1000 });
    // await otp.save();

    // await sendEmail(email, "Verify your email", `Your OTP is: ${otpCode}`);
    user = new User({ email, password: hashedPassword, isVerified: true, role: role, name: name });
    await user.save();

    res.status(201).json({ message: "User registered. Please verify your email." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed" });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    const otpDoc = await OTP.findOne({ email, code });
    if (!otpDoc || otpDoc.expiresAt < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    // Mark user as verified
    await User.updateOne({ email }, { isVerified: true });
    await OTP.deleteMany({ email }); // Remove all OTPs for this email

    res.status(201).json({ message: "Email verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OTP verification failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    // if (!user.isVerified) return res.status(403).json({ error: "Please verify your email first" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
  .cookie("token", token, {
    httpOnly: true,
    secure: true, // Set to false in development if not using HTTPS
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  }).status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    console.log(req.user);
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ loggedIn: true, user });
  } catch (err) {
    res.status(500).json({ message: "Error verifying user", error: err.message });
  }
};


