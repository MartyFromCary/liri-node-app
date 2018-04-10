"use strict";
const keys = require("./keys.js");

const Twitter = require("twitter");
const twitter = new Twitter({
  consumer_key: keys.twitter.consumer_key,
  consumer_secret: keys.twitter.consumer_secret,
  access_token_key: keys.twitter.access_token_key,
  access_token_secret: keys.twitter.access_token_secret
});

const Spotify = require("node-spotify-api");
const spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});

const request = require("request");

const fs = require("fs");
const readline = require("readline");

const logger = fs.createWriteStream("log.txt", { flags: "a" });

function myLog(text) {
  console.log(text);
  logger.write(text + "\n");
  return 0;
}

function myTweets(nrResults) {
  twitter.get(
    "statuses/user_timeline",
    {
      count: nrResults || "20"
    },
    (err, data) => {
      if (err) {
        return myLog(`Error occurred: ${err}`);
      }
      if (data.length == 0) {
        return myLog("Sorry, no texts retrieved");
      }
      data.forEach(Item => {
        myLog(`Text: ${Item.text}`);
        myLog(`Date: ${Item.created_at}`);
        myLog("");
      });
      return 0;
    }
  );
}

function spotifyThisSong(song, nrResults) {
  spotify.search(
    {
      query: song || "The Sign/Ace of Base",
      type: "track",
      limit: nrResults || "1"
    },
    (err, data) => {
      if (err) {
        return myLog(`Error occurred: ${err}`);
      }
      if (data.tracks.items.length == 0) {
        return myLog(`Sorry, nothing found for '${song}'`);
      }
      data.tracks.items.forEach(Item => {
        let artists = [];
        Item.artists.forEach(Artist => {
          artists.push(Artist.name);
        });
        myLog(`Artist(s): ${artists.join(", ")}`);
        myLog(`Name:      ${Item.name}`);
        myLog(`Preview:   ${Item.external_urls.spotify}`);
        myLog(`Album:     ${Item.album.name}`);
        myLog("");
      });
      return 0;
    }
  );
}

function movieThis(movie) {
  let url = "http://www.omdbapi.com/?";
  url += "t=" + (movie || "Mr. Nobody");
  url += "&type=movie";
  url += "&apikey=trilogy";
  request(url, (err, response, text) => {
    if (err) {
      return myLog(`Error occurred: ${err}`);
    }
    let data = JSON.parse(text);

    myLog(`Title: ${data.Title}`);
    myLog(`Year: ${data.Year}`);
    myLog(`IMDB Rating: ${data.imdbRating}`);
    data.Ratings.forEach(rating => {
      if (rating.Source === "Rotten Tomatoes") {
        myLog(`${rating.Source} Rating: ${rating.Value}`);
      }
    });
    myLog(`Country: ${data.Country}`);
    myLog(`Language: ${data.Language}`);
    myLog(`Plot: ${data.Plot}`);
    myLog(`Actors: ${data.Actors}`);
    return 0;
  });
}

function doWhatItSays(argv) {
  myLog(argv.join(" "));
  switch (argv[0]) {
    case "my-tweets":
      return myTweets(argv[1]);
    case "movie-this":
      return movieThis(argv[1]);
    case "spotify-this-song":
      return spotifyThisSong(argv[1], argv[2]);
  }
  return myLog(`Unknown command: ${argv[0]}`);
}

process.argv.shift();
process.argv.shift();

if (process.argv[0] !== "do-what-it-says") {
  return doWhatItSays(process.argv);
}
myLog(process.argv.join(" "));

const doWhatItSaysFile = process.argv[1] || "random.txt";
fs.access(doWhatItSaysFile, fs.constants.R_OK, err => {
  if (err) {
    myLog(`no read access for ${doWhatItSaysFile}!`);
    process.exit(1);
  }
});

var lineReader = readline.createInterface({
  input: fs.createReadStream(doWhatItSaysFile)
});

lineReader.on("line", line => {
  doWhatItSays(line.split(","));
});

return 0;
