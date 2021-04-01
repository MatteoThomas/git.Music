var searchButton = document.getElementById("search-button");
var player = document.getElementById("player");
var title = document.getElementById("artist");
var artistName = document.getElementsByClassName("artist");
var header = document.getElementsByClassName("header");
var song = document.getElementById("songs");
var album = document.getElementById("albums");
var more = document.getElementById('more');

    $("#song_album").hide();
    $("#more").hide();


function getAPI() {

$("#more").show();
$("#song_album").show();
   

    var artist = document.getElementById("input").value;
    $(artistName).html("");
    $(artistName).html(artist);
   

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
            $("#more").html("");
            console.log(data);
            console.log(data.data[0].preview);
            console.log(data.data[0].title);
            console.log(data.data[0].album.title);
            song = data.data[0].title;
            album = data.data[0].album.title;
            $('#songs').html("");
            $('#songs').append(song);
            $('#albums').html("");
            $('#albums').html(album);

            for (var i = 1; i <= 8; i++) {


               
                var songsEl = document.createElement("li");
            songsEl.innerHTML = `<a class="song_link" value=${data.data[i].preview}>${data.data[i].title} from ${data.data[i].album.title}</a>`;
            
            $("#more").append(songsEl);
            }
            
            $(".song_link").click(function () {
                var url = $(this).attr("value");
                var details = $(this).text();
                var detail_array = details.split(" from ");
                $("#songs").text(detail_array[0]);
                $("#albums").text(detail_array[1]);
                album = detail_array[1];
                console.log(detail_array[0]);
                console.log(url);
                player.setAttribute("src", url);
                console.log($(this).val());
                
            })
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

        // gets pic from array
        var pic = data.results[0].cover_image
        console.log(data)
        var img = $('<img class="box" src=' + pic + '>', {});
     
        // adds image from discogs to the page
        $('#img').append(img);
    })
}

// removes pevious searches image
function removeImage() {
    $("#img").html("");
}

function showMore() {
    $("#more").show();
}

// event listeners
searchButton.addEventListener("click", getAPI);
searchButton.addEventListener("click", discAPI);
more.addEventListener("click", showMore);
// event listener allows enter key to trigger APIs, clear search field, clear image
$('.input').on('keypress', function (e) {
    if (e.which == 13) {
        console.log("enter key pressed")
        getAPI()
        discAPI()
        removeImage()
    }
});