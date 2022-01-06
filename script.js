// var requirejs = require("requirejs");
// requirejs("dotenv").config();

var searchButton = document.getElementById("search-button");
var player = document.getElementById("player");
var title = document.getElementById("artist");
var artistName = document.getElementsByClassName("artist");
var header = document.getElementsByClassName("header");
var song = document.getElementById("songs");
var album = document.getElementById("albums");
var more = document.getElementById("more");
$("#song_album").hide();
$("#more").hide();
$("#player_container").hide();

const toggle = document.querySelector("#toggle");
toggle.addEventListener("click", modeSwitch);

let isLight = true;

function modeSwitch() {
  isLight = !isLight;
  let root = document.body;

  isLight
    ? (toggle.innerText = "Light Mode")
    : (toggle.innerText = "Dark Mode");

  root.classList.toggle("light-mode");
}

function getAPI() {
  $("#more").show();
  $("#song_album").show();
  $("#player_container").show();
  $("#page-info").hide();

  var artist = document.getElementById("input").value;

  $(artistName).html("");
  $(artistName).html(artist);

  fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${artist}`, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "69b90c75b0msh9037becee190a85p1d61ccjsn154266cd5838",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
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

      $("#songs").html("");
      $("#songs").append(song);
      $("#albums").html("");
      $("#albums").html(album);

      for (var i = 1; i <= 8; i++) {
        var songsEl = document.createElement("li");
        songsEl.innerHTML = `<a class="song_link" value=${data.data[i].preview}>${data.data[i].title} from ${data.data[i].album.title}</a>`;

        $("#more").append(songsEl);
      }

      // CLICK ON SAMPLE TITLE
      $(".song_link").click(function () {
        var url = $(this).attr("value");
        var details = $(this).text();
        console.log(details); // "(song name) from (album name)"
        // SEPARATES "from" OUT OF this AND CREATES AN ARRAY NAMED detail_array
        var detail_array = details.split(" from ");
        // WRITES TEXT FROM detail_array [0] to #songs DIV
        $("#songs").text(detail_array[0]);
        // WRITES TEXT FROM detail_array [1] to #albums DIV
        $("#albums").text(detail_array[1]);
        album = detail_array[1];
        console.log(detail_array[0]); // song title
        // console.log(url);
        player.setAttribute("src", url);
        console.log($(this).val());
        // console.log(album);
      });
      player.setAttribute("src", `${data.data[0].preview}`);
    });
}

// discogs API call
function discAPI() {
  let url = "https://api.discogs.com/database/search?q=";
  let artist = $("#input").val();
  let apiKey = "&key=DspsPlrDDgNBHyZQSnHV";
  let secret = "&secret=JtsCNMKigmGKAhrugoBTVSyTLESOZUZT";
  let total = url + artist + apiKey + secret;
  //  $('#artist-name').html("");
  $("#artist-name").append(artist);
  $(".input").val("");

  // fetched data from api
  fetch(total)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // gets pic from array
      var pic = data.results[0].cover_image;
      var img = $('<img class="box" src=' + pic + ">", {});
      // var picTwo = data.results[1].cover_image;
      // var imgTwo = $('<img class="box" src=' + picTwo + ">", {});
      console.log(data);
      // adds image from discogs to the page
      $("#img").append(img);

      https: localStorage.setItem("artStore", artist);
      // Retrieve
      var item = localStorage.getItem("artStore");
      console.log(item);

      var value = 0;
      $("#img").click(function () {
        value++;
        console.log(value);
        var picTwo = data.results[value].cover_image;
        var imgTwo = $('<img class="box" src=' + picTwo + ">", {});
        $("#img").html("");
        $("#img").append(imgTwo);
      });
    });
  $("#list-group").show();
}

setStore();

function setStore() {
  var item = localStorage.getItem("artStore");
  console.log(item);
  $("#list-group").append(item);
}

// removes previous searches image
function removeImage() {
  $("#img").html("");
  $("#imgTwo").html("");
}

function showMore() {
  $("#more").show();
}

function showPlayer() {
  $("#player-container").show();
}

function hidePlayer() {
  $("#player-container").hide();
}

hidePlayer();
// event listeners
searchButton.addEventListener("click", getAPI);
searchButton.addEventListener("click", discAPI);

// event listener allows enter key to trigger APIs, clear search field, clear image
$(".input").on("keypress", function (e) {
  if (e.which == 13) {
    console.log("enter key pressed");
    getAPI();
    discAPI();
    removeImage();
    showPlayer();
  }
});

// BROKEN IMG FIX
