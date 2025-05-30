const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    _id: ObjectId, // Primary Key
    sender_id: { type: ObjectId, ref: "User" }, // for. key to user
    receiver_id: { type: ObjectId, ref: "User" }, // for. key to user
    message: String,
    created_at: { type: Date, default: Date.now }
  });

module.exports = mongoose.model("Message",messageSchema);