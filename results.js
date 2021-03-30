
var searchButton = document.getElementById("search-button");
var player = document.getElementById("player");
var title = document.getElementById("artist");
var players = document.getElementById("players");
function getAPI() {

    var artist = document.getElementById("input").value;
    title.textContent = artist;
    apiCall = `http://tastedive.com/api/similar?limit=0&q=${artist}&k=406651-RebeccaL-ITGD1FYL`;
    // adding fetch

    fetch(apiCall)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })


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
            // for (var i = 0; i < 5; i++) {
            //     var liEl = document.createElement("li");
            //     var new_player = document.createElement("audio");
            //     new_player.setAttribute("src", `${data.data[i].preview}`);
            //     new_player.setAttribute("control");
            //     liEl.appendChild(new_player);
            //     players.appendChild(liEl);
            //     // console.log(new_player);
            //     console.log(liEl)
            // }
              player.setAttribute("src", `${data.data[0].preview}`);
        })



}

searchButton.addEventListener("click", getAPI);