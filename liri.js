//                                        **** Liri Bot ****
// =============================================================================================================
//                           **** REFER TO README.MD FILE FOR INSTRUCTIONS ****

// Require and configure dotenv file
require('dotenv').config();

// Colors npm
var colors = require('colors');

// Gets keys.js exports
var keys = require('./keys.js');

// Node Packages
// =============================================================================================================
var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

// Variables
// =============================================================================================================
var command = process.argv[2];
var song = '';
var movie = '';

// API key information
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Switch-Case directs the command to the correct function
switch (command) {
  case 'my-tweets':
    myTweets();
    break;

  case 'movie-this':
    movieThis();
    break;

  case 'spotify-this-song':
    spotifyThisSong();
    break;

  case 'do-what-it-says':
    doWhatItSays();
    break;
}
// Functions
// =============================================================================================================

//                                        **** MOVIE THIS ****
// =============================================================================================================
function movieThis() {
  if (command === 'movie-this' && process.argv[3] === undefined) {
    movie = 'Mr+Nobody';
    movieDisplay();
  }
  else if (command === 'movie-this') {
    for (var i = 3; i < process.argv.length; i++) {
      movie += process.argv[i] + '+';
    }
    movieDisplay();
  }
}
function movieDisplay() {
  // OMDB api url 
  request('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=trilogy', function (error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {
      // Parse the body of the site and display
      prsBody = JSON.parse(body);
      console.log(`\n==================================================================`.yellow +
                  `\n                       Title: ${prsBody.Title}`.yellow +
                  `\n==================================================================\n`.yellow +
                  `\nRotten Tomatoes:`.blue + ` ${prsBody.Ratings[1].Value}\n` +
                  `\nIMDB:`.blue + ` ${prsBody.Ratings[0].Value}\n` +
                  `\nCountry:`.blue + ` ${prsBody.Country}\n` +
                  `\nLanguage:`.blue + ` ${prsBody.Language}\n` +
                  `\nPlot:`.blue + ` ${prsBody.Plot}\n` +
                  `\nActors:`.blue + ` ${prsBody.Actors}\n` +
                  `==================================================================\n`.yellow);
    }
  });
}

//                                          **** MY TWEETS ****
// =============================================================================================================
function myTweets() {
  var params = { screen_name: '@Phineas05526995', count: 20 };

  client.get('statuses/user_timeline', params, function (error, tweets) {
    // If the request is successful
    if (!error) {
      // Parse the text of the tweets and display
      console.log(`\n==================================================================`.yellow +
                  `\n                        LAST 20 TWEETS`.yellow +
                  `\n==================================================================\n`.yellow);
      for (var i = 0; i < 20; i++) {
        var num = i + 1;
        console.log(`${num}`.blue + `. ${tweets[i].text}`);
      }
      console.log(`==================================================================\n`.yellow);
    }
    // Error handler
    else {
      throw error;
    }
  });
}

//                                     **** SPOTIFY THIS SONG ****
// =============================================================================================================
function spotifyThisSong() {
  if (command === 'spotify-this-song' && process.argv[3] === undefined) {
    song = 'The Sign';
    songDisplay();
  }
  else if (command === 'spotify-this-song') {
    for (var i = 3; i < process.argv.length; i++) {
      song += process.argv[i] + '+';
    }
    songDisplay();
  }
}
function songDisplay() {
  spotify.search({ type: 'track', query: song }, function (err, data) {
    // Error handler
    if (err) {
      return console.log('Error occu: ' + err);
    }
    // Parse the Spotify API data and display
    var items = data.tracks.items;
    console.log(`\n==================================================================\n`.yellow +
                `                       Artist: ${items[0].artists[0].name}\n`.yellow +
                `==================================================================\n`.yellow +
                `\nSong Name:`.blue + ` ${items[0].name}\n` +
                `\nSpotify Link:`.blue + ` ${items[0].preview_url}\n` +
                `\nAlbum:`.blue + ` ${items[0].album.name}\n`+
                `\n==================================================================\n`.yellow);
  });
}

//                                     **** DO WHAT IT SAYS ****
// =============================================================================================================

function doWhatItSays() {

  fs.readFile('random.txt', 'utf8', function (error, data) {
    // Error handling
    if (error) {
      return console.log(error);
    }
    // Converts .txt file data to an array and parses arguments
    var dataArr = data.split(',');
    command = dataArr[0];
    var argument = dataArr[1];

    switch (command) {
      case 'my-tweets':
        myTweets();
        break;

      case 'movie-this':
        movie = argument;
        movieDisplay();
        break;

      case 'spotify-this-song':
        song = argument;
        songDisplay();
        break;
    }
  });
}

