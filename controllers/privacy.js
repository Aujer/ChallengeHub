const validator = require('validator');
const nodemailer = require('nodemailer');
const Challenge = require('../models/Challenge');
const User = require('../models/User');

/**
 * GET /new-challenge
 * New challenge page.
 */
exports.getPrivacy = (req, res) => {
  res.render('privacy', {
    title: 'ASD'
  });
};

/**
 * POST /challenge-accepted
 * Post a new challenge.
 */
exports.postChallenge = (req, res, next) => {
  const validationErrors = [];
  // if some errors, add to validationErrors
  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('/create');
  }
  var challenge = new Challenge({
    challenge_name: req.body.challenge_name,
    description: req.body.description,
    creator: req.user,
    //creator_name: req.user.profile.name,
    created: Date.now(),
    submission_type: req.body.submission_type,
    reward: req.body.reward
  });
  var db = req.db;
  db.collection('New Challenges').insertOne(challenge,function(err) {
    if (err) throw err;
    console.log("Challenge uploaded successfully!")
  })
  req.flash('success', { msg: 'Challenged created!' });
  res.render('create', {
    title: 'Challenge uploaded!'
  })
};
