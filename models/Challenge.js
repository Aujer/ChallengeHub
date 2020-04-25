const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  challenge_name: { type: String, unique: true },
  description: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
    },
  picture: Buffer,
  time_frame: {
    time_start: Date,
    time_end: Date,
  },
  submission_type: String,
  facebook: String,
  twitter: String,
  reward: String,
  submissions: Array
}, { timestamps: true });

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
