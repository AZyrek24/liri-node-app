//Require and configure dotenv file
require("dotenv").config();

var keys = require("./keys.js");
//Node Packages
//=============================================================================================================
var request = require("request");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');

//Variables
//=============================================================================================================
var command = process.argv[2];
//API key information
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//**** MOVIE THIS ****
//=============================================================================================================
if (command === "movie-this" && process.argv[3] === undefined) {
  //Default OMDB api url if argument left empty
  request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy", function (error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {
      // Parse the body of the site
      console.log("=================================")
      console.log("Title: " + JSON.parse(body).Title);
      console.log("=================================")
      console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
      console.log("IMDB: " + JSON.parse(body).Ratings[0].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
}
// else {
//   for (var i = ; i < process.)
//   var movie = process.argv[3]
// }

//**** MY TWEETS ****
//=============================================================================================================
if (command === "my-tweets") {
  var params = { screen_name: '@Phineas05526995', count: 20 };

  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      console.log("LAST 20 TWEETS")
      console.log("=================================")
      for (var i = 0; i < tweets.length; i++) {
        console.log((i+1) + ". " + tweets[i].text);
      }
      console.log("=================================")
    }
  });
}