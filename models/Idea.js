const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const ideaSchema = new Schema({
  seller_id: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  buyer_id:{
    type: Types.ObjectId,
    ref: "User",
    default: null,
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'sold'],
    default: 'available'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Idea", ideaSchema);
