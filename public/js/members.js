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

  let id;
  let allMsgs;
  $(".viewTripBtn").on("click", function (event) {
    id = event.target.dataset.id
    //console.log(id)
    window.location.replace(`/mytrips/${id}`) 
  })

  $(".viewMsgs").one("click", function (event) {
    if($(".allMsgsDiv").display !== "none"){
        let name = event.target.name
        fetch(`/api/posts/${name}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',  
        }
      })
      .then((response) => response.json())
      .then((data) => {
        
        for (i=0; i<data.posts.length; i++) {
          // console.log(data.posts[i].body)
          let allMsgs = data.posts[i].body
          $("#allMsgsDiv").append(allMsgs)
          // console.log(allMsgs)
          let p = document.createElement('p')
          $("#allMsgsDiv").append(p)
        }
      })
    } else {
      $(".allMsgsDiv").style.display = "none"
    }
  })

  $(".submitPost").on("click", function(event) {
    let id = event.target.dataset.id
    let fullMsg = [document.getElementById('tripMsgBoard').value, document.getElementById('author').value]
    let fullMsgStg = fullMsg.join(' - ')
    let newPost = {
      body: fullMsgStg,
      trips_id: id,
    }
  
    fetch(`/api/posts/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
      trips_id: id
    }).then(document.getElementById('tripMsgBoard').value = "")
    location.reload()
    $(".viewMsgs").click()
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


