//var dot = require("dotenv").config();

// importing files from 'keys.js'
console.log("Both this and what was exported from the keys file should print.");
var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);

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
                "Title: " + jsonData.Title,
                "Year: " + jsonData.Year,
                "IMDB: " + jsonData.imdbRating,
               "Rotten Tomatoes Rating: " + jsonData.Ratings.tomatoRating,
                "Country: " + jsonData.Country,
                "Plot: " + jsonData.Plot,
                "Actors: " + jsonData.Actors
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

        
        var concertURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        axios.get(concertURL)
        .then(function(response) {
            console.log(response);
            var jsonData = response.data[0];
            var concertTime = jsonData.datetime;

                var concertData = [
                    "Venue: " + jsonData.venue.name,
                    "Location of Venue: " + jsonData.venue.city,
                    "Time of Event: " + moment(concertTime).format('MM/DD/YYYY h:mm:ss a')
                    
                ].join("\n\n");
                console.log(concertData);
                

            })

    }

    function getSongInfo(song) {
        console.log("get song INFO");
        if (song === undefined) {
            song = "The Sign";
        }
    }

    startProg(arg1, arg2);