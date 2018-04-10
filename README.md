# liri-node-app
#Language Interpretation and Recognition Interface. 

This is a command-line app using request.js to call: http://www.omdbapi.com/
and api apps node-spotify-api and twitter

Usage: 

node liri my-tweets
displays my last tweets, (which I don't do)


node liri spotify-this-song <song>
Lists:
* Artist(s)
* The song's name
* A preview link of the song from Spotify
* The album that the song is from

node liri movie-this <movie>
List the movie's
* Title of the movie.
* Year the movie came out.
* IMDB Rating of the movie.
* Rotten Tomatoes Rating of the movie.
* Country where the movie was produced.
* Language of the movie.
* Plot of the movie.
* Actors in the movie.

node liri do-what-it-says
* Reads the local file "random.txt" and executes the command
