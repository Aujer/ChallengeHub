/**
 * GET /
 */

const User = require('../models/User');
const Challenge = require('../models/Challenge');
const Subscription = require('../models/Subscription');
const Upload = require('../models/Upload')
const path = require('path');
var ObjectId = require('mongodb').ObjectId; 


exports.index = (req, res,name) => {

	var query = { challenge_name: name };
	var db=req.db

	db.collection("New Challenges").find(query).toArray(function(err, result) {

	    if (err) throw err;
	    console.log(result);
	    if (result.length == 0) {
	      // This means we can't find the challenge
	      console.log("sorry can't find your challenge")
	      load_error_page(req,res, name)
	      console.log("potato")
	    }
	    else {
	      load_challenge_page(req,res,name,result[0])
	    }
	  })


	};


load_challenge_page = (req, res,name,challenge) => {
	console.log("pickle pickle")
	console.log(challenge['creator'])
	console.log("pickle pickle")
    //var queryNum = { challenge_name: name, user: ObjectId(challenge['creator']) };
    var queryNum = { challenge_name: name };
    db = req.db;
    // User.findById(challenge['creator'], (err, user) => {
	  db.collection("subscriptions").find(queryNum).toArray(function(err, result) {
	    if (err) { return next(err); }
	    // result.filter(function(entry){ 
	    // 	console.log()
	    // 	return entry.user.equals("regers")})
	    console.log('toad');
	    console.log(result);
	    console.log('toad');
	    res.render('dynamic', {
		    title: 'Dynamic',
		    name: name,
		    description: challenge['description'],
		    reward: challenge['reward'],
		    creator: challenge['creator'],
		    subscribers: result,
		    numSubscribers: result.length
		  });
	  });
		// });
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
	    name: req.user.profile.name,
	    //creator_name: req.user.profile.name,
	    created: Date.now(),

  				});
    var db = req.db;
    db.collection('subscriptions').insertOne(subscription,function(err) {
    if (err) throw err;
    console.log("Challenge uploaded successfully!");
    res.redirect(req.header('Referer'));
    console.log("flannel")
    })

  } else {
  	req.flash('success', { msg: 'Please log in to join challenge!'});
  	console.log("user is not logged in");
  	res.redirect(req.header('Referer'));
  }
};

/**
* Upload a submission for a challenge.
*/
exports.postFileUpload = (req, res) => {
	//var file_path = path.resolve(req.file.originalname);
	var file_path = req.file.path;
	var upload = new Upload({
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

/**
 * POST /update for the challenge
 * Post a new challenge.
 */
exports.postUpdate = (req, res, next) => {
  const validationErrors = [];
  // if some errors, add to validationErrors
  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect(req.header('Referer'));
  }
  //var file_path = path.resolve(req.file.originalname);
  var update = new Upload({
    uploader: req.user,
    name: req.user.profile.name,
		// how to link a challenge to a upload
    created: Date.now(),
    description: req.body.description,
		//path: file_path
  });
  var db = req.db;
  db.collection('Challenge_Updates').insertOne(update,function(err) {
    if (err) throw err;
    console.log("Update uploaded successfully!")
  })
  // want to create a new web page with this as the challenge and redirect to that web page

  // for now create a temporary rendering
  req.flash('success', { msg: 'Successful Update!' });
  res.redirect(req.header('Referer'));
  //return res.redirect('/challenge-submitted');
};

