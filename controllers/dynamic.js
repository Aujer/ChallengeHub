/**
 * GET /
 */

const User = require('../models/User');
const Subscription = require('../models/Subscription');

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
exports.postSignUp = (req, res) => {
	console.log("post sign up is working")
	console.log(req)
	console.log(req.headers)


  if (req.user) {
  	req.flash('success', { msg: 'Challenge subscribed!' });
  	console.log("mamamama")
  	console.log(req.body)
  	console.log("papapa")

    backURL=req.header('Referer') || '/';
  
    res.redirect(backURL);

    var subscription = new Subscription({

	    challenge_name: req.challenge_name,
	    user: req.user,
	    //creator_name: req.user.profile.name,
	    created: Date.now(),
    
  				});
    var db = req.db;
    db.collection('subscriptions').insertOne(subscription,function(err) {
    if (err) throw err;
    console.log("Challenge uploaded successfully!")

    })

  } else {
  	console.log("use is not logged in")
  }
};





