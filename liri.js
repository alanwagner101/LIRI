require("dotenv").config();

var Spotify = require('node-spotify-api');
var axios = require("axios");

var spotify = new Spotify({
  id: "fa22ad241c0f418387adfe88d3582729",
  secret: "ab25272f380e482dba2f124478127118"
});

var command = process.argv[2];
var search = process.argv[3];


var OMDBkey = "208ebee4";
var OMDBurl = "http://www.omdbapi.com/?apikey=" + OMDBkey + "&t=" + search + "&y=&plot=short";


function RunSpotify() {
  spotify
  .search({ type: 'track', query: search })
  .then(function(response) {
  for (var i = 0; i < response.tracks.items.length; i++) {
    console.log("Artist : " + JSON.stringify(response.tracks.items[i].artists[0].name));
    console.log("Album : " + JSON.stringify(response.tracks.items[i].album.name));
    console.log("Track : " + JSON.stringify(response.tracks.items[i].name));
    console.log("Track Preview: " + JSON.stringify(response.tracks.items[i].preview_url));
    console.log("==========================");
  }
  })
  .catch(function(err) {
    console.log(err);
  });
}

function RunOMDB() {
  axios({
    method: "get",
    url: OMDBurl
  })
  .then(function(response) {

      console.log("Movie Title : " + response.data.Title);
      console.log("Year of Release : " + response.data.Year);
      console.log("IMDB Rating : " + response.data.Ratings[0].Value);
      console.log("Rotten Tomotatoes Rating : " + response.data.Ratings[1].Value);
      console.log("Country Made In : " + response.data.Country);
      console.log("Language : " + response.data.Language);
      console.log("Plot : " + response.data.Plot);
      console.log("Actors : " + response.data.Actors);
      console.log("=========================")

  })
}



if (command == "spotify-this-song") {
  RunSpotify()
} else if (command == "movie-this") {
  RunOMDB()
}
