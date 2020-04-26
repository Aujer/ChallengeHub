const validator = require('validator');
const nodemailer = require('nodemailer');

// Alex's part

const Challenge = require('../models/Challenge');
const User = require('../models/User');

/**
 * GET /new-challenge
 * New challenge page.
 */
exports.getChallenge = (req, res) => {
  if (!req.user) {
    return res.redirect('/login');
  }
  res.render('create', {
    title: 'Create a new challenge!'
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
    created: Date.now(),
    submission_type: req.body.submission_type,
    reward: req.body.reward
  });
  var db = req.db;
  db.collection('New Challenges').insertOne(challenge,function(err) {
    if (err) throw err;
    console.log("Challenge uploaded successfully!")
  })
  // want to create a new web page with this as the challenge and redirect to that web page

  // for now create a temporary rendering
  req.flash('success', { msg: 'Challenged created!' });
  res.render('create', {
    title: 'Challenge uploaded!'
  })
  //return res.redirect('/challenge-submitted');
};

/**
 * GET /challenge-submitted
 * Submitted challenge page.
 */
exports.getSubmittedChallenge = (req, res) => {
  if (!req.user) {
    return res.redirect('/login');
  }
  res.render('tempChallenge', {
    title: 'The challenge begins!'
  });
};
