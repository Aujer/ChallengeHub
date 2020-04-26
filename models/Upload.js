const mongoose = require('mongoose');
const User = require('../models/User')
const Challenge = require('../models/Challenge');

const uploadSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  },
  // still need to link the upload to the specific challenge
  challenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge'
  },
  description: String,
  path: String,
  name: String
}, { timestamps: true });

const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;
