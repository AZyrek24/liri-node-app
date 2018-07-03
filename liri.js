//Node Packages
//=============================================================================================================

var env = require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");

var Spotify = require('node-spotify-api');

//API key information
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});
// var client = new Twitter(keys.twitter);
console.log(spotify);
console.log(process.argv[3]);
//MOVIE THIS
if (process.argv[2] === "movie-this" && process.argv[3] === undefined) {
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
//   for (var i = 2; i < process.)
//   var movie = process.argv[3]
// }
