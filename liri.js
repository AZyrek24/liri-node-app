require("dotenv").config();
var keysINeed = require("./keys.js");
var request = require("request");

var Spotify = require('node-spotify-api');

//API key information
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
console.log(spotify);

//OMDB api url
// http://www.omdbapi.com/?i=tt3896198&apikey=445dd844