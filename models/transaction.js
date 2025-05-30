const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    _id: ObjectId, // Primary Key
    buyer_id: { type: ObjectId, ref: "User" }, // for. key to user
    seller_id: { type: ObjectId, ref: "User" }, // for. key to user
    idea_id: { type: ObjectId, ref: "IdeaListing" }, // for. key to idea
    amount: Number,
    status: { type: String, enum: ["pending", "completed", "canceled"] },
    created_at: { type: Date, default: Date.now }
});

module.export = mongoose.model("Transaction",transactionSchema);