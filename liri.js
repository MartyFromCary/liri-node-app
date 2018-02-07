//my-tweets
//spotify-this-song
//movie-this
//do-what-it-says

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

function myLog(text) {
	console.log(text);
	return 0;
}

function myTweets(nrResults) {
	twitter.get(
		"statuses/user_timeline",
		{
			count: nrResults || 20
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
			limit: nrResults || 1
		},
		(err, data) => {
			if (err) {
				return myLog(`Error occurred: ${err}`);
			}
			if (data.tracks.items.length == 0) {
				return myLog(`Sorry, nothing found for ${song}`);
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

function movieThis(){

}

myTweets();
spotifyThisSong();
movieThis();