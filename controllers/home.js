/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {

var db=req.db
var ObjectId = require('mongodb').ObjectId; 

console.log("dingo")
console.log(req.user)
console.log("tammy")

if (req.user) {
	var query = { "creator": ObjectId(req.user._id) };	
}

else {
	var query = { "creator": 0 };		
}


console.log(query)
        db.collection("New Challenges").find(query).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          res.render('home', {
            title: 'Home',
            city: "tokyo",
            list_of_challenges: result,
          });
          
    })


};


