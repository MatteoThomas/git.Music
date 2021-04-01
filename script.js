var searchButton = document.getElementById("search-button");
var player = document.getElementById("player");
var title = document.getElementById("artist");
var players = document.getElementById("players");
var header = document.getElementsByClassName("header");
function getAPI() {

    var artist = document.getElementById("input").value;
    $(header).html("");
    $(header).html(artist);
    // title.textContent = artist;
    

    fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${artist}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "69b90c75b0msh9037becee190a85p1d61ccjsn154266cd5838",
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
            }
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.data[0].preview);
            player.setAttribute("src", `${data.data[0].preview}`);
        })
}

// discogs API call
function discAPI() {
    let url = "https://api.discogs.com/database/search?q="
    let artist = $('#input').val();
    let apiKey = "&key=DspsPlrDDgNBHyZQSnHV";
    let secret = "&secret=JtsCNMKigmGKAhrugoBTVSyTLESOZUZT"
    let total = url + artist + apiKey + secret;
    $('#artist-name').html("");
    $('#artist-name').append(artist);
    $('.input').val("");

    // fetched data from api
    fetch(total).then(function (response) {
        return response.json();
    }).then(function (data) {
    // gets releases from array
  
  
  
    var pic = data.results[0].cover_image
    console.log(data)
    var img = $('<img class="box" src=' + pic + '>', {});

// adds image from discogs to the page
$('#img').append(img);
        // gets pic from array
        var title = data.results[1].title
        console.log(title)


        // adds image from discogs to the page
        $('#releases').append(title);

  
    })
}

// removes pevious searches image
function removeImage() {
    $("#img").html("");
}

// event listeners
searchButton.addEventListener("click", getAPI);
searchButton.addEventListener("click", discAPI);

// event listener allows enter key to trigger APIs, clear search field, clear image
$('.input').on('keypress', function (e) {
    if (e.which == 13) {
        console.log("enter key pressed")
        getAPI()
        discAPI()
        removeImage()
    }
});