const mongoose = require('mongoose');
const User = require('../models/User')

const subscriptionSchema = new mongoose.Schema({
  challenge_name: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
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