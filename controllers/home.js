/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {

var db=req.db
var ObjectId = require('mongodb').ObjectId;

// console.log("dingo")
// console.log(req.user)
// console.log("tammy")


if (req.user) {
  var query = { "creator": ObjectId(req.user._id) };
}
else {
  var query = { "creator": 0 };
}
console.log(query)
	db.collection("subscriptions").find({ "user": ObjectId(req.user._id)}).toArray(function(err3, result3) {
    db.collection("New Challenges").find().toArray(function(err1, result1) {
      if (err1) throw err1;
        db.collection("New Challenges").find(query).toArray(function(err, result) {
          if (err) throw err;
            db.collection("Challenge Uploads").find().toArray(function(err2, result2) {
              if (err2) throw err2;
              console.log(result);
              if (req.user) {
                  res.render('home', {
                title: 'Home',
                city: "tokyo",
                list_of_challenges: result,
                popular_challenges: result1.splice(0,6),
                subscribed_challenges: result3,
                recent_uploads: result2
              });
              }
              else {
                res.render("home_logged_out", {
                  title: "Home_logged_out",
                  popular_challenges: result1.slice(0,6),
                  recent_uploads: result2
                })
              }
          });
            });
          })
        })
};
