console.log("I am connected to HTML!");

// Search event listener - enter
$('#search').on('keypress', function (e) {
    if (e.which == 13) {
    console.log("enter key pressed")
    makeCall()
    removeImage()
    }
});

// Search event listener - click
$("#searchbtn").click(function () {
    makeCall()
    removeImage()
    console.log('search button clicked')
});

// Clears search after click / removes previous image 
function clearSearch() {
    $('#search').val("");
  }
  function removeImage() {
    $(".img").html("");
  }

  // api request
function makeCall() {
    let url = "https://api.discogs.com/database/search?q="
    let artist = $('#search').val();
    let apiKey = "&key=DspsPlrDDgNBHyZQSnHV";
    let secret = "&secret=JtsCNMKigmGKAhrugoBTVSyTLESOZUZT"
    let pageNum = $('#page').val();
    let page = '&per_page=' + pageNum
    let total = url + artist + apiKey + secret + page;
    $(".artist-name").html("");
    $('.artist-name').append(artist);
    $('#search').val("");
  
    // fetched data from api
    fetch(total).then(function (response) {
      return response.json();
    }).then(function (data) {
  
        // gets pic from array
      var pic = data.results[0].cover_image
      console.log(data)
      var img = $('<img class="box" src=' + pic + '>', {
      });
    
      // adds image from discogs to the page
      $('.img').append(img);
    })
  }
  