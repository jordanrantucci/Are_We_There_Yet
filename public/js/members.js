$(document).ready(function() {
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
    // console.log(event.target.dataset.id)
  })

  $(".deleteBtn").on("click", function (event) {
    // e.stopPropagation();
    // console.log(e.target)
    const id = event.target.dataset.id;
    console.log(id)
    fetch(`/api/trip/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    // .then(window.location.replace("/mytrips"));
    // console.log(event.target.dataset)
  })

//  })
})
  // // //   const tripId = this.id;
  // // //   console.log(tripId)
  // // // }).then((req) => {
  // // //     req.target.parentElement.remove();
  // // //     console.log('deleted')
  // // //   });
  // //   console.log(this)
  
  // //   $.delete("/mytrips/:trip").then(function(data) {
  // //     db.trips.findOne({
  // //       where: {
  // //         id: req.params.trip
  // //       }
  // //     })
  // //   })
  //   $.get('/api/trip/:trip', (req, res) => {
  //     db.trips.destroy({
  //       where: {
  //         id: req.params.trip,
  //       },
  //     })
  //   })
  //   .then(function () {
  //       res.redirect("/mytrips")
 