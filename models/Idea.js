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
  score:{
    type: Number,
    default: 50
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  price: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'sold'],
    default: 'available'
  },
  verified:{
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Idea", ideaSchema);
