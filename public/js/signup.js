$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $(".signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var nameInput = $("input#name-input");

  // When the signup button is clicked, we validate the email and password are not blank
  // Added name to submit form
  signUpForm.on("submit", function(event) {
    console.log("signup.js line 9")
    event.preventDefault();
    var userData = {
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      console.log("signup.js line 17")
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.name, userData.email, userData.password);
    nameInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(name, email, password) {
    console.log("signup.js line 29")
    $.post("/api/signup", {
      name: name,
      email: email,
      password: password
    })
      .then(function(data) {
        window.location.replace("/mytrips");
        console.log("signup.js line 36")
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    console.log("signup.js line 43")
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
