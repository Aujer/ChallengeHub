/**
 * GET /
 */

const User = require('../models/User');
const Challenge = require('../models/Challenge');
const Subscription = require('../models/Subscription');
const Upload = require('../models/Upload')
const path = require('path');


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
    var queryNum = { challenge_name: name };
    db = req.db;
    User.findById(challenge['creator'], (err, user) => {
		  db.collection("subscriptions").find(queryNum).toArray(function(err, result) {
		    if (err) { return next(err); }
		    res.render('dynamic', {
			    title: 'Dynamic',
			    name: name,
			    description: challenge['description'],
			    reward: challenge['reward'],
			    creator: user.profile.name,
			    subscribers: result,
			    numSubscribers: result.length
			  });
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

	    challenge_name: req.body.challenge_name,
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
  	req.flash('success', { msg: 'Challenge accepted!' });
  	console.log("use is not logged in")
  }
};

/**
* Upload a submission for a challenge.
*/
exports.postFileUpload = (req, res) => {
	var file_path = path.resolve(req.file.originalname);
	var upload = new Upload({
    uploader: req.user,
    uploader: req.user,
		// how to link a challenge to a upload
    created: Date.now(),
		path: file_path
  });
  var db = req.db;
  db.collection('Challenge Uploads').insertOne(upload,function(err) {
    if (err) throw err;
    console.log("Challenge uploaded successfully!")
  })
  req.flash('success', { msg: 'File was uploaded successfully.' });
  res.redirect(req.header('Referer'));
};
