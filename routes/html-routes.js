// // Requiring path to so we can use relative routes to our HTML files
// var path = require("path");


const db = require("../models")
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
const apiRoutes = require("./api-routes");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    // console.log("html-apiRoutes.js line 14")
    if (req.user) {
      // console.log("html-routes.js line 16")
      // res.redirect("/members");
    }
    // res.sendFile(path.join(__dirname, "login"));
    res.render('partials/login')
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      // res.redirect("/members");

    }
    // res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render('partials/login')
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // Updated mytrips route to include trips_id
  app.get("/mytrips", isAuthenticated, function(req, res) {
    db.trips.findAll({
    }).then(function(result) {
      const tripObj = {trips: result.map(data=>{
        return data.dataValues
      })}
      // res.sendFile(path.join(__dirname, "../public/members.html"));
      res.render('partials/mytrips', {trips:tripObj.trips})
    })
  });


  app.get("/newtrip", isAuthenticated, function (req, res) {
      res.render('partials/newtrip')  
    });


  app.get("/signup", function(req, res) {
    // console.log("html-routes.js line 43")
    res.render('partials/signup')
  })

  app.get("/mytrips/:trip", function(req, res) {
    const trip={id: req.params.trip}
    res.render("partials/trip", trip)
    // console.log(req.params.trip)
  })

  app.delete("/mytrips/:trip", function(req, res) {
    db.trips.findOne({
      where: {
        id: req.params.trip
      }
    }).then(function () {
      res.redirect("/mytrips")
    })
  })
};
