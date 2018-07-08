//                                        **** Liri Bot ****
//=============================================================================================================
//                           **** REFER TO README.MD FILE FOR INSTRUCTIONS ****

//Require and configure dotenv file
require("dotenv").config();

//Gets keys.js exports
var keys = require("./keys.js");

//Node Packages
//=============================================================================================================
var fs = require("fs");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');

//Variables
//=============================================================================================================
var command = process.argv[2];
var song = "";
var movie = "";
var showData;

//API key information
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//Switch-Case directs the command to the correct function
switch (command) {
  case "my-tweets":
    myTweets();
    break;

  case "movie-this":
    movieThis();
    break;

  case "spotify-this-song":
    spotifyThisSong();
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;
}
//Functions
//=============================================================================================================

//                                        **** MOVIE THIS ****
//=============================================================================================================
function movieThis() {
  if (command === "movie-this" && process.argv[3] === undefined) {
    movie = "Mr+Nobody";
    movieDisplay();
  }
  else if (command === "movie-this") {
    for (var i = 3; i < process.argv.length; i++) {
      movie += process.argv[i] + "+";
    }
    movieDisplay();
  }
}
function movieDisplay() {
  //OMDB api url 
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
function myTweets() {
  var params = { screen_name: '@Phineas05526995', count: 20 };

  client.get('statuses/user_timeline', params, function (error, tweets) {
    // If the request is successful
    if (!error) {
      // Parse the text of the tweets
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
function spotifyThisSong() {
  if (command === "spotify-this-song" && process.argv[3] === undefined) {
    song = "The Sign";
    songDisplay();
  }
  else if (command === "spotify-this-song") {
    for (var i = 3; i < process.argv.length; i++) {
      song += process.argv[i] + "+";
    }
    songDisplay();
  }
}
function songDisplay() {
  spotify.search({ type: 'track', query: song }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("\n=================================");
    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("=================================");
    console.log("\nSong Name: " + data.tracks.items[0].name);
    console.log("\nSpotify Link: " + data.tracks.items[0].preview_url);
    console.log("\nAlbum: " + data.tracks.items[0].album.name);
    console.log("=================================");
  });
}

//                                     **** DO WHAT IT SAYS ****
//=============================================================================================================

function doWhatItSays() {

  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    command = dataArr[0];
    var argument = dataArr[1];
    switch (command) {
      case "my-tweets":
        myTweets();
        break;

      case "movie-this":
        movie = argument;
        movieDisplay();
        break;

      case "spotify-this-song":
        song = argument;
        songDisplay();
        break;
    }
  });
}

