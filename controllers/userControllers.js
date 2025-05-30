const User = require("../models/User");

exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    console.log(user); 
    res.status(200).json({
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at
    });
  } catch (err) {
    res.status(400).json({ error: "Failed to fetch user" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: "Failed to update user" });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete user" });
  }
};