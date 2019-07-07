require("dotenv").config();
//var Spotify = require('node-spotify-api');
//var spotify = new Spotify(keys.spotify);


// importing files from 'keys.js'
var keys = require("./keys.js");
var request = require('request');
var axios = require('axios');
var moment = require('moment');



var arg1 = process.argv[2];
var arg2 = process.argv.slice(3).join(" ");

console.log("arg1: " + arg1);
console.log("arg2: "+ arg2);

var startProg = function (arg1, arg2) {
    
    switch (arg1) {
        case "concert-this": getMyBands(arg2);
            break;
            case "movie-this": getMovieInfo(arg2);
            break;
            case "spotify-this-song": getSongInfo(arg2);
            break;
            case "do-what-it-says": getWhat(arg2);
            break;
            default:
            console.log("enter the right action please")
    }
}

function getMovieInfo(movieName) {
    var divider = "\n------------------------------------------------------------";
    console.log("get movie");
    if (movieName === undefined) {
        movieName = "Mr Nobody";
    }

    var movieUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";
    
    axios.get(movieUrl)
    .then(function (response) {
        console.log(response);
            var jsonData = response.data;

            var movieData = [
                divider,
                "Title: " + jsonData.Title,
                "Year: " + jsonData.Year,
                "IMDB: " + jsonData.imdbRating,
                "Rotten Tomatoes Rating: " + jsonData.Ratings.tomatoRating,
                "Country: " + jsonData.Country,
                "Plot: " + jsonData.Plot,
                "Actors: " + jsonData.Actors,
                divider
            ].join("\n\n");
            
            console.log(movieData);
            
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally (function(){

        });
    }
    
    function getMyBands(artist) {
        console.log ("get tickets");
        var divider = "\n------------------------------------------------------------";
        
        var concertURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        axios.get(concertURL)
        .then(function(response) {
            console.log(response);
            var jsonData = response.data[0];
            var concertTime = jsonData.datetime;
            
            var concertData = [
                divider,
                "Venue: " + jsonData.venue.name,
                "Location of Venue: " + jsonData.venue.city,
                "Time of Event: " + moment(concertTime).format('MM/DD/YYYY h:mm:ss a'),
                divider
            ].join("\n\n");
            console.log(concertData);
            
            
        })
        
    }
    
    function getSongInfo(arg2) {
        var divider = "\n------------------------------------------------------------";
        var Spotify = require("node-spotify-api");
        var track = arg2;
        var spotify = new Spotify({
          id: "8866202a6eb14d1eb27ea164a7f9f481",
          secret: "cb3e89d8ff274f6c93153316d08d1fc5"
        });

    spotify
    .search({ type: "track", query: track, limit: 1 })
    .then(function(response) {

        console.log(response);
        var response = response.tracks.items[0];
        var musicData = [
            divider,
            "Album Name: " + response.album.name,
        "Song Name: " + response.name,
        "Artist Name: " + response.artists[0].name,
        "Preview Link: " + response.external_urls.spotify,
        divider
      ].join("\n\n");
      console.log(musicData);
    })
    .catch(function(error) {
      console.log(error);
      getSongInfo("The Sign Ace of Base")
    });
 }

 var fs = require('fs');

function getWhat() {

 fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
        return console.log(error);
    }
    console.log(data);

    var dataArr = data.split(","); 

    console.log(dataArr);

    var action = dataArr[0];
    var query = dataArr[1];

    switch(action) {
        case "concert-this": getMyBands(query);
        break;
        case "movie-this": getMovieInfo(query);
        break;
        case "spotify-this-song": getSongInfo(query);
        break;
    }


 });

}

startProg(arg1, arg2);
    