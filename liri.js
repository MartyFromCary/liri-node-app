//my-tweets
//spotify-this-song
//movie-this
//do-what-it-says

"use strict";
const keys = require("./keys.js");

const Spotify = require("node-spotify-api");
const spotify = new Spotify({
	id: keys.spotify.id,
	secret: keys.spotify.secret
});

function spotifyThisSong(song, nrResults) {
	spotify.search(
		{
			query: song || "The Sign/Ace of Base",
			type: "track",
			limit: nrResults || 1
		},
		(err, data) => {
			if (err) {
				return console.log(`Error occurred: ${err}`);
			}
			if (data.tracks.items.length == 0) {
				console.log(`Sorry, nothing found for ${song}`);
			}
			data.tracks.items.forEach(Item => {
				let artists = [];
				Item.artists.forEach(Artist => {
					artists.push(Artist.name);
				});
				console.log(`Artist(s): ${artists.join(", ")}`);
				console.log(`Name:      ${Item.name}`);
				console.log(`Preview:   ${Item.external_urls.spotify}`);
				console.log(`Album:     ${Item.album.name}`);
				console.log("");
			});
		}
	);
}
spotifyThisSong();
//console.log(keys.twitter);