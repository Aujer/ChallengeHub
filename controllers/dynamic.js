/**
 * GET /
 */

const User = require('../models/User');


exports.index = (req, res,name) => {

	var query = { challenge_name: name };
	var db=req.db

	db.collection("New Challenges").find(query).toArray(function(err, result) {
	    
	    if (err) throw err;
	    console.log(result);
	    if (result.length == 0) {
	      // This means we can't find the challenge
	      console.log("sorry can't find your challenge homie")
	      load_error_page(req,res, name)
	      console.log("potato")
	    }
	    else {
	      load_challenge_page(req,res,name,result[0])  
	    }
	  })

	  
	};


load_challenge_page = (req, res,name,challenge) => {
    var ObjectId = require('mongodb').ObjectId; 
    var db=req.db;
    User.findById(challenge['creator'], (err, user) => {
	    if (err) { return next(err); }
	    res.render('dynamic', {
		    title: 'Dynamic',
		    name: name,
		    description: challenge['description'],
		    reward: challenge['reward'],
		    creator: user.profile.name,
		  });
		 });
};



load_error_page = (req, res,name) => {
  res.render('error', {
    title: 'Error',
    name: name
  });
};

/**
 * POST /challenges/signup
 * Sign up for challenge.
 */
exports.postSignUp = (req, res, next) => {
  if (!req.user) {

  } else {
  	req.flash('success', { msg: 'Challenge accepted!' });
  }
};





