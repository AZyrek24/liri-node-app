//Require and configure dotenv file
require("dotenv").config();

//Gets keys.js exports
var keys = require("./keys.js");

//Node Packages
//=============================================================================================================
var request = require("request");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');

//Variables
//=============================================================================================================
var command = process.argv[2];
var song = "";
var movie = "";

//API key information
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//                                        **** MOVIE THIS ****
//=============================================================================================================
if (command === "movie-this" && process.argv[3] === undefined) {
  movie = "Mr+Nobody";
  movieThis();
}
else if (command === "movie-this") {
  for (var i = 3; i < process.argv.length; i++) {
    movie += process.argv[i] + "+";
  }
  movieThis();
}
function movieThis() {
  //Default OMDB api url if argument left empty
  request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
      // Parse the body of the site
      console.log("\n=================================")
      console.log("Title: " + JSON.parse(body).Title);
      console.log("=================================")
      console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
      console.log("\nIMDB: " + JSON.parse(body).Ratings[0].Value);
      console.log("\nCountry: " + JSON.parse(body).Country);
      console.log("\nLanguage: " + JSON.parse(body).Language);
      console.log("\nPlot: " + JSON.parse(body).Plot);
      console.log("\nActors: " + JSON.parse(body).Actors);
      console.log("=================================\n")
    }
  });
}

//                                          **** MY TWEETS ****
//=============================================================================================================
if (command === "my-tweets") {
  var params = { screen_name: '@Phineas05526995', count: 20 };

  client.get('statuses/user_timeline', params, function (error, tweets) {
    if (!error) {
      console.log("\n=================================")
      console.log("LAST 20 TWEETS");
      console.log("=================================");
      for (var i = 0; i < 20; i++) {
        console.log((i + 1) + ". " + tweets[i].text);
      }
      console.log("=================================\n");
    }
    else {
      throw error;
    }
  });
}

//                                     **** SPOTIFY THIS SONG ****
//=============================================================================================================
if (command === "spotify-this-song" && process.argv[3] === undefined) {
  song = "The Sign";
  spotifyThisSong();
}
else if (command === "spotify-this-song") {
  for (var i = 3; i < process.argv.length; i++) {
    song += process.argv[i] + "+";
    spotifyThisSong();
  }
}
function spotifyThisSong() {
  spotify.search({ type: 'track', query: song }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    console.log(data.tracks.items[0].artists[0].name);
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].preview_url);
    console.log(data.tracks.items[0].album.name);
  });
}
