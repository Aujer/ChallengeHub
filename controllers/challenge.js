const validator = require('validator');
const nodemailer = require('nodemailer');

/**
 * GET /contact
 * Contact form page.
 */
exports.getContact = (req, res) => {
  const unknownUser = !(req.user);

  res.render('challenge', {
    title: 'Challenge',
    unknownUser,
  });
};

/**
 * POST /contact
 * Send a contact form via Nodemailer.
 */
exports.postContact = (req, res) => {
  const validationErrors = [];
  let fromName;
  let fromEmail;
  if (!req.user) {
    if (validator.isEmpty(req.body.name)) validationErrors.push({ msg: 'Please enter your name' });
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
  }
  if (validator.isEmpty(req.body.message)) validationErrors.push({ msg: 'Please enter your message.' });

  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('/contact');
  }

  if (!req.user) {
    fromName = req.body.name;
    fromEmail = req.body.email;
  } else {
    fromName = req.user.profile.name || '';
    fromEmail = req.user.email;
  }

  let transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASSWORD
    }
  });
  const mailOptions = {
    to: 'your@email.com',
    from: `${fromName} <${fromEmail}>`,
    subject: 'Contact Form | Hackathon Starter',
    text: req.body.message
  };

  return transporter.sendMail(mailOptions)
    .then(() => {
      req.flash('success', { msg: 'Email has been sent successfully!' });
      res.redirect('/contact');
    })
    .catch((err) => {
      if (err.message === 'self signed certificate in certificate chain') {
        console.log('WARNING: Self signed certificate in certificate chain. Retrying with the self signed certificate. Use a valid certificate if in production.');
        transporter = nodemailer.createTransport({
          service: 'SendGrid',
          auth: {
            user: process.env.SENDGRID_USER,
            pass: process.env.SENDGRID_PASSWORD
          },
          tls: {
            rejectUnauthorized: false
          }
        });
        return transporter.sendMail(mailOptions);
      }
      console.log('ERROR: Could not send contact email after security downgrade.\n', err);
      req.flash('errors', { msg: 'Error sending the message. Please try again shortly.' });
      return false;
    })
    .then((result) => {
      if (result) {
        req.flash('success', { msg: 'Email has been sent successfully!' });
        return res.redirect('/contact');
      }
    })
    .catch((err) => {
      console.log('ERROR: Could not send contact email.\n', err);
      req.flash('errors', { msg: 'Error sending the message. Please try again shortly.' });
      return res.redirect('/contact');
    });
};

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
  res.render('challenge', {
    title: 'Start a new challenge!'
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
    return res.redirect('/new-challenge');
  }
  var challenge = new Challenge({
    challenge_name: req.body.challenge_name,
    description: req.body.description,
    creator: req.currentUser,
  });
  var db = req.db;
  db.collection('New Challenges').insertOne(challenge,function(err) {
    if (err) throw err;
    console.log("Challenge uploaded successfully!")
  })
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
