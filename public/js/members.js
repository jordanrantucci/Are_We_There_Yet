$(document).ready(function() {

  let editToggle = false;

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
    .then(function(response) {
      console.log("Trip deleted!");
      window.location.replace("/mytrips");
    });
  })

  $(".allTripBtn").on("click", function () {
    window.location.replace("/mytrips")
  })

  $(".editTripBtn").on("click", function () {

    if(editToggle) {
      $(".display-box").toggleClass("d-none");
      $(".edit-box").toggleClass("d-block");
      editToggle = true;
    } else {
      $(".display-box").toggleClass("d-block");
      $(".edit-box").toggleClass("d-none");
      editToggle = false;
    }
  })
  
  $("#saveEditBtn").on("click", function(event) {
    const id = event.target.dataset.id;

   const newTripName = $("#tripNameEdit").val();
   const newTripAttendees = $("#tripAttendeesEdit").val();
   const newTripInfo = $("#tripInfoEdit").val();

   const editedTrip = {
     trip_name: newTripName,
     attendees: newTripAttendees,
     trip_info: newTripInfo
   }

  //  $.put(`/api/trip/${id}`, editedTrip)
  //   .then(function(data) {
  //     window.location.replace(`/mytrips/${id}`)
  //   });

  fetch(`/api/trip/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editedTrip)
  })
  .then(function(response) {
    window.location.replace(`/mytrips/${id}`)
  });

  })

})


