// // Requiring path to so we can use relative routes to our HTML files
// var path = require("path");

var _ = require('lodash');
const db = require("../models")
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
const apiRoutes = require("./api-routes");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/mytrips");
    }
    // res.sendFile(path.join(__dirname, "login"));
    res.render('partials/login')
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/mytrips");

    }
    // res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render('partials/login')
  });

  // Here we've add our isAuthenticated middleware to this route.
  app.get("/mytrips", isAuthenticated, function(req, res) {
    db.trips.findAll({
    }).then(function(result) {
      const trips = _.map(result, "dataValues")
      const tripObj = { trips: trips }
      // {trips: result.map(data=>{
      //  return data.dataValues
      // })}
      res.render('partials/mytrips', tripObj)
    })
  });


  app.get("/newtrip", isAuthenticated, function (req, res) {
      res.render('partials/newtrip')  
    });


  app.get("/signup", function(req, res) {
    res.render('partials/signup')
  })

  app.get("/mytrips/:trip", function(req, res) {
    db.trips.findOne({
      where: {
        id: req.params.trip
      }
    }).then(function (data){
        const trip = {}
        Object.assign(trip, data.dataValues)
        console.log(data.dataValues)
        console.log(trip)
    //      const trip={id: req.params.trip}
    res.render("partials/trip", trip)
    })
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
