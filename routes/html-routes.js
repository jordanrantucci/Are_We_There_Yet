// // Requiring path to so we can use relative routes to our HTML files
// var path = require("path");


const models = require("../models")
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
const apiRoutes = require("./api-routes");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    console.log("html-apiRoutes.js line 14")
    if (req.user) {
      console.log("html-routes.js line 16")
      // res.redirect("/members");
    }
    // res.sendFile(path.join(__dirname, "login"));
    res.render('partials/login')
  });

  app.get("/login", function(req, res) {
    console.log("html-routes.js line 24")
    // If the user already has an account send them to the members page
    if (req.user) {
      // res.redirect("/members");
      console.log("html-routes line 28")
    }
    // res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render('partials/login')
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/mytrips", isAuthenticated, function(req, res) {
    console.log("html-routes.js line 37")
    // res.sendFile(path.join(__dirname, "../public/members.html"));
    res.render('partials/mytrips')
  });

  app.get("/signup", function(req, res) {
    console.log("html-routes.js line 43")
    res.render('partials/signup')
  })
};
