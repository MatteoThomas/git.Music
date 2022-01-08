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

  isLight ? (toggle.innerText = "Light") : (toggle.innerText = "Dark");

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
      // GETS IMAGE ON INITIAL SEARCH
      var pic = data.results[0].cover_image;
      // CREATES VAR OF HTML + pic
      var img = $('<img class="box" src=' + pic + ">", {});
      console.log(data);
      // APPENDS img VAR TO id="img"
      $("#img").append(img);
      // SETS ARTIST NAME IN LOCAL STORAGE
      https: localStorage.setItem("artStore", artist);
      https: localStorage.setItem("image", pic);
      // RETRIEVES ARTIST NAME FROM LOCAL STORAGE
      var item = localStorage.getItem("artStore");
      // NEED TO CONSOLIDATE / MAKE IT DRIER //
      // INCREMENT DECREMENT INDEX TO CHANGE PICTURE
      var value = 0;
      $(".plus").click(function () {
        value++;
        const picURL = data.results[value].cover_image;
        const imgTwo = $('<img class="box" src=' + picURL + ">", {});
        $("#img").html("");
        $("#img").append(imgTwo);
        // SETS CURRENT IMAGE TO LOCAL STORAGE WHEN ARROW BUTTON CLICKED
        https: localStorage.setItem("image", picURL);
      });

      $(".minus").click(function () {
        // PREVENT < 0 INTEGER
        if (value > 0) {
          value--;
        }
        const picURL = data.results[value].cover_image;
        const imgTwo = $('<img class="box" src=' + picURL + ">", {});
        $("#img").html("");
        $("#img").append(imgTwo);
        // SETS CURRENT IMAGE TO LOCAL STORAGE WHEN ARROW BUTTON CLICKED
        https: localStorage.setItem("image", picURL);
      });
    });
  $("#list-group").show();
}

// RETREIVES IMAGE FROM LOCAL STORAGE / OPEN IMAGE IN NEW TAB ON CLICK
$("#img").click(function () {
  var pic = localStorage.getItem("image");
  window.open(pic);
});
// RETRIEVES ARTIST FROM LOCAL STORAGE / APPENDS id="list-group"
function setStore() {
  var item = localStorage.getItem("artStore");
  console.log(item);
  $("#list-group").append(item);
}

// COULD I DO ALL THIS BELOW WITH ADDING & REMOVING CLASSES??? //
// REMOVES IMAGE BEFORE NEXT IMAGE IS LOADED
function removeImage() {
  $("#img").html("");
}

// SHOWS ELEMENTS ON SEARCH
function showItems() {
  $("#player-container").show(800);
  $(".arrows").show(800);
}

// HIDES ELEMENTS ON PAGE LOAD
function hideItems() {
  $("#player-container").hide();
  $(".arrows").hide();
  $(".icon").hide();
}
hideItems();
// HIDES SEARCH INPUT, BUTTON, LAST ON SEARCH
function hideSearch() {
  $(".field").hide(800);
}
// SHOWS SEARCH ICON
function showSearchIcon() {
  $(".icon").show(800);
}
function hideSearchIcon() {
  $(".icon").hide(800);
}

$(".icon").click(function () {
  $(".icon").hide(800);
  $(".field").show(800);
});

function search() {
  getAPI();
  discAPI();
  removeImage();
  showItems();
  hideSearch();
  showSearchIcon();
}

// event listener allows enter key to trigger APIs, clear search field, clear image
$(".btn").click(function () {
  search();
});
// event listener allows enter key to trigger APIs, clear search field, clear image
$(".input").on("keypress", function (e) {
  if (e.which == 13) {
    getAPI();
    discAPI();
    removeImage();
    showItems();
    hideSearch();
    showSearchIcon();
  }
});

// BROKEN IMG FIX
