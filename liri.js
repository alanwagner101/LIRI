require("dotenv").config();

var Spotify = require('node-spotify-api');
var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js");
var moment = require("moment")

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var search = process.argv[3];


var OMDBkey = keys.OMDB.id;
var OMDBurl = "http://www.omdbapi.com/?apikey=" + OMDBkey + "&t=" + search + "&y=&plot=short";

var BandsKey = keys.Bands.id;
var BandsURL = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=" + BandsKey;


function RunSpotify() {
  spotify
    .search({ type: 'track', query: search })
    .then(function (response) {
      if (response.tracks.items.length == 0) {
        spotify
          .search({ type: 'track', query: "The Sign" })
          .then(function (response) {
            console.log("====================");
            console.log("There were no songs listed, Here is some info about 'The Sign' by Ace of Base!");
            console.log("====================");
            fs.appendFileSync("log.txt", "\n==========================\n", "utf-8", function (err) {
              if (err) {
                console.log(err)
              }
            })
            fs.appendFileSync("log.txt","\n" + command + "  " + search + "\n", "utf-8", function (err) {
              if (err) {
                console.log(err)
              }
            })
            fs.appendFileSync("log.txt","\n==========================\n", "utf-8", function (err) {
              if (err) {
                console.log(err)
              }
            })
            for (var i = 0; i < response.tracks.items.length; i++) {
              console.log("Artist : " + JSON.stringify(response.tracks.items[i].artists[0].name));
              console.log("Album : " + JSON.stringify(response.tracks.items[i].album.name));
              console.log("Track : " + JSON.stringify(response.tracks.items[i].name));
              console.log("Track Preview: " + JSON.stringify(response.tracks.items[i].preview_url));
              console.log("==========================");
              var data = {
                Artist: "\n" + (response.tracks.items[i].artists[0].name) + "\n",
                Album: "\n" + (response.tracks.items[i].album.name) + "\n",
                Track: "\n" + (response.tracks.items[i].name) + "\n",
                TrackPreview: "\n" + (response.tracks.items[i].preview_url) + "\n"
              }
              fs.appendFileSync("log.txt", data.Artist, "utf-8", function (err) {
                if (err) {
                  console.log(err)
                }
              })
              fs.appendFileSync("log.txt", data.Album, "utf-8", function (err) {
                if (err) {
                  console.log(err)
                }
              })
              fs.appendFileSync("log.txt", data.Track, "utf-8", function (err) {
                if (err) {
                  console.log(err)
                }
              })
              fs.appendFileSync("log.txt", data.TrackPreview, "utf-8", function (err) {
                if (err) {
                  console.log(err)
                }
              })
              fs.appendFileSync("log.txt", "\n=======================\n", "utf-8", function (err) {
                if (err) {
                  console.log(err)
                }
              })
            }
          })
      } else {
        fs.appendFileSync("log.txt", "\n==========================\n", "utf-8", function (err) {
          if (err) {
            console.log(err)
          }
        })
        fs.appendFileSync("log.txt","\n" + command + "  " + search + "\n", "utf-8", function (err) {
          if (err) {
            console.log(err)
          }
        })
        fs.appendFileSync("log.txt","\n==========================\n", "utf-8", function (err) {
          if (err) {
            console.log(err)
          }
        })
        for (var i = 0; i < response.tracks.items.length; i++) {
          console.log("Artist : " + JSON.stringify(response.tracks.items[i].artists[0].name));
          console.log("Album : " + JSON.stringify(response.tracks.items[i].album.name));
          console.log("Track : " + JSON.stringify(response.tracks.items[i].name));
          console.log("Track Preview: " + JSON.stringify(response.tracks.items[i].preview_url));
          console.log("==========================");
          var data = {
            Artist: "\n" + (response.tracks.items[i].artists[0].name) + "\n",
            Album: "\n" + (response.tracks.items[i].album.name) + "\n",
            Track: "\n" + (response.tracks.items[i].name) + "\n",
            TrackPreview: "\n" + (response.tracks.items[i].preview_url) + "\n"
          }
          fs.appendFileSync("log.txt", data.Artist, "utf-8", function (err) {
            if (err) {
              console.log(err)
            }
          })
          fs.appendFileSync("log.txt", data.Album, "utf-8", function (err) {
            if (err) {
              console.log(err)
            }
          })
          fs.appendFileSync("log.txt", data.Track, "utf-8", function (err) {
            if (err) {
              console.log(err)
            }
          })
          fs.appendFileSync("log.txt", data.TrackPreview, "utf-8", function (err) {
            if (err) {
              console.log(err)
            }
          })
          fs.appendFileSync("log.txt", "\n=======================\n", "utf-8", function (err) {
            if (err) {
              console.log(err)
            }
          })
        }
      }
    })
    .catch(function (err) {
      console.log(err);
    });
};

function RunOMDB() {
  axios({
    method: "get",
    url: OMDBurl
  })
    .then(function (response) {

      console.log("Movie Title : " + response.data.Title);
      console.log("Year of Release : " + response.data.Year);
      console.log("IMDB Rating : " + response.data.Ratings[0].Value);
      console.log("Rotten Tomotatoes Rating : " + response.data.Ratings[1].Value);
      console.log("Country Made In : " + response.data.Country);
      console.log("Language : " + response.data.Language);
      console.log("Plot : " + response.data.Plot);
      console.log("Actors : " + response.data.Actors);
      console.log("=========================")
      fs.appendFileSync("log.txt", "\n==========================\n", "utf-8", function (err) {
        if (err) {
          console.log(err)
        }
      })
      fs.appendFileSync("log.txt","\n" + command + "  " + search + "\n", "utf-8", function (err) {
        if (err) {
          console.log(err)
        }
      })
      fs.appendFileSync("log.txt","\n==========================\n", "utf-8", function (err) {
        if (err) {
          console.log(err)
        }
      })
      var data = {
        Title: "\n" + "Movie Title : " + response.data.Title + "\n",
        Release: "\n" + "Year of Release : " + response.data.Year + "\n",
        IMDB: "\n" + "IMDB Rating : " + response.data.Ratings[0].Value + "\n",
        Rotten: "\n" + "Rotten Tomotatoes Rating : " + response.data.Ratings[1].Value + "\n",
        Country: "\n" + "Country Made In : " + response.data.Country + "\n",
        Language: "\n" + "Language : " + response.data.Language + "\n",
        Plot: "\n" + "Plot : " + response.data.Plot + "\n",
        Actors: "\n" + "Actors : " + response.data.Actors + "\n"
      }
      fs.appendFileSync("log.txt", data.Title, "utf-8", function (err) {
        if (err) {
          console.log(err)
        }
      })
      fs.appendFileSync("log.txt", data.Release, "utf-8", function (err) {
        if (err) {
          console.log(err)
        }
      })
      fs.appendFileSync("log.txt", data.IMDB, "utf-8", function (err) {
        if (err) {
          console.log(err)
        }
      })
      fs.appendFileSync("log.txt", data.Rotten, "utf-8", function (err) {
        if (err) {
          console.log(err)
        }
      })
      fs.appendFileSync("log.txt", data.Country, "utf-8", function (err) {
        if (err) {
          console.log(err)
        }
      })
      fs.appendFileSync("log.txt", data.Language, "utf-8", function (err) {
        if (err) {
          console.log(err)
        }
      })
      fs.appendFileSync("log.txt", data.Plot, "utf-8", function (err) {
        if (err) {
          console.log(err)
        }
      })
      fs.appendFileSync("log.txt", data.Actors, "utf-8", function (err) {
        if (err) {
          console.log(err)
        }
      })
      fs.appendFileSync("log.txt", "\n==============================\n", "utf-8", function (err) {
        if (err) {
          console.log(err)
        }
      })
    });
};

function RunBands() {
  axios({
    method: "get",
    url: BandsURL
  }).then(function (response) {
    for (var i = 0; i < response.data.length; i++) {
      console.log("Lineup : " + response.data[i].lineup);
      console.log("Venue Name : " + response.data[i].venue.name);
      console.log("Date of Event : " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
      console.log("============================");
      fs.appendFileSync("log.txt", "\n==========================\n", "utf-8", function (err) {
        if (err) {
          console.log(err)
        }
      })
      fs.appendFileSync("log.txt","\n" + command + search + "\n", "utf-8", function (err) {
        if (err) {
          console.log(err)
        }
      })
      fs.appendFileSync("log.txt","\n==========================\n", "utf-8", function (err) {
        if (err) {
          console.log(err)
        }
      })
      var data = {
        Lineup: "\n" + "Lineup : " + response.data[i].lineup + "\n",
        Venue: "\n" + "Venue Name : " + response.data[i].venue.name + "\n",
        Date: "\n" + "Date of Event : " + moment(response.data[i].datetime).format("MM/DD/YYYY") + "\n",
      }
      fs.appendFileSync("log.txt", data.Lineup, "utf-8", function (err) {
        if (err) {
          console.log(err)
        }
      })
      fs.appendFileSync("log.txt", data.Venue, "utf-8", function (err) {
        if (err) {
          console.log(err)
        }
      })
      fs.appendFileSync("log.txt", data.Date, "utf-8", function (err) {
        if (err) {
          console.log(err)
        }
      })
      fs.appendFileSync("log.txt", "\n==============================\n", "utf-8", function (err) {
        if (err) {
          console.log(err)
        }
      })
    };
  });
};

function RunDoIt() {
  fs.readFile("random.txt", "utf-8", function (err, data) {

    if (err) {
      return console.log(err);
    };

    var DataArr = data.split(",");
    var DoItCommand = DataArr[0];
    search = DataArr[1];

    if (DoItCommand == "spotify-this-song") {
      RunSpotify()
    } else if (DoItCommand == "movie-this") {
      RunOMDB()
    } else if (DoItCommand == "concert-this") {
      RunBands()
    } else if (DoItCommand == "do-what-it-says") {
      RunDoIt()
    };
  });
};


if (command == "spotify-this-song") {
  RunSpotify()
} else if (command == "movie-this") {
  RunOMDB()
} else if (command == "do-what-it-says") {
  RunDoIt()
} else if (command == "concert-this") {
  RunBands()
};
