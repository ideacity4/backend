const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // _id: ObjectId,
    name: {type: String, required: true},
    email: { type: String, unique: true ,required: true}, // It is Unique for each user
    password: {type: String, required: true}, // (This is Hashed Password)
    avatar:{
        type : String,
        default: "https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg"
    },
    role: { type: String, enum: ["user", "admin"], required: true },
    created_at: { type: Date, default: Date.now }
  });

module.exports = mongoose.model("User",userSchema);
