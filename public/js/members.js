$(document).ready(function() {

  $(function () {
    $(window).on('scroll', function () {
        if ( $(window).scrollTop() > 10 ) {
            $('.navbar').addClass('active');
        } else {
            $('.navbar').removeClass('active');
        }
    });
  });

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });


  $("#newTripBtn").on("click", function() {
    window.location.replace("/newtrip")
  })


  $(".viewTripBtn").on("click", function (event) {
    window.location.replace(`/mytrips/${event.target.dataset.id}`)
  })

  $(".deleteBtn").on("click", function (event) {
    const id = event.target.dataset.id
    fetch(`/api/trip/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(window.location.replace("/mytrips"));
  })

  $(".allTripBtn").on("click", function () {
    window.location.replace("/mytrips")
  })
})