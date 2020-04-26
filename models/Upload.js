const mongoose = require('mongoose');
const User = require('../models/User')
const Challenge = require('../models/Challenge');

const uploadSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  // need a way to upload the file path

}, { timestamps: true });

const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;
