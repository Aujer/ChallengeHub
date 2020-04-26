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

var query = { "creator": ObjectId(req.user._id) };
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


