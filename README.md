# LIRI Bot Instructions

## LIRI is a command line node app that takes in parameters and gives back data. There are four different commands which can also be followed by a relevant query.
## Open terminal and direct to the <liri-node-app> filepath where liri-node-app is located.
## To Run LIRI, enter one of the following in the command line:
  * `node liri.js my-tweets`
    - This command will log the last 20 tweets of my twitter page
    ![Image of my-tweets](/assets/images/my-tweets.png)
  
  * `node liri.js movie-this *movie-name-here*`
    - This command will log your movie's title, RT rating, IMDB rating, country, language, plot summary, and actors from the OMDB API data.
    ![Image of movie-this](/assets/images/movie-this.png)
  
  * `node liri.js spotify-this-song *song-name-here*`
    - This command will log data (artist, song's name, preview link, and the album containing the song) from the first matching song in the Spotify API.
    ![Image of spotify-this-song](/assets/images/spotify-this-song.png)    
  
  * `node liri.js do-what-it-says`
    - This command will log data from the random.txt file
    ![Image of do-what-it-says](/assets/images/do-what-it-says.png)  
