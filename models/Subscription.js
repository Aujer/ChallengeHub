const mongoose = require('mongoose');
const User = require('../models/User')

const subscriptionSchema = new mongoose.Schema({
  challenge_name: { type: String, unique: false },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    ref: 'User'
  },
  name: String,
  created: {
    type: Date,
    default: Date.now
    }
}, { timestamps: true });

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;