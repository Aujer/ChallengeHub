const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  // user: self
  challenge_name: { type: String, unique: true },
  description: String,
  creator: String,
  picture: String,
  time_start: Date,
  time_end: Date,
  submission_type: String,
  facebook: String,
  twitter: String,
  reward: String
}, { timestamps: true });

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
