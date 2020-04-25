const validator = require('validator');
const Challenge = require('../models/Challenge');

// want to add way to submit form

/**
 * GET /new-challenge
 * New challenge page.
 */
exports.getChallenge = (req, res) => {
  if (!req.user) {
    return res.redirect('/login');
  }
  res.render('challenge', {
    title: 'Start a new challenge!'
  });
};

/**
 * POST /challenge-accepted
 * Create a new local account.
 */
exports.postChallenge = (req, res, next) => {
  //const validationErrors = [];
  // if some errors, add to validationErrors
  /*
  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('/new-challenge');
  }
  */
  // have to edit this part to work with mongodb
  const challenge = new Challenge({
    challenge_name: req.body.challege_name,
    description: req.body.description
  });
  // want to create a new web page with this as the challenge and redirect to that web page

  // for now create a temporary rendering
  req.flash('success', { msg: 'Challenged uploaded!' });
  res.render('challenge', {
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
