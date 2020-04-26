/**
 * GET /
 */


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
  res.render('dynamic', {
	    title: 'Dynamic',
	    name: name,
	    description: challenge['description'],
	    reward: challenge['reward'],
	    creator: challenge['creator']
	  });
};



load_error_page = (req, res,name) => {
  res.render('error', {
    title: 'Error',
    name: name
  });
};


