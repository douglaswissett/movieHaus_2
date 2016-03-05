'use strict'
var dotenv  = require('dotenv');
var pgp     = require('pg-promise')({});
var cn      = "postgres://DB_USER:DB_PASS@localhost/moviehaus2";
var db      = pgp(cn);

// show all theatres in theatres table
function showTheatres(req,res,next){}

// show all movies in the theatre
// get all movie_id from theatres_movies_join table where theatre_id=($1)
function showTheatreMovie(req,res,next){}

// get all info of a movie
function getMovie(req,res,next){}

// 1- add movie to movies table 
// 2- get last movie_id
// 3- (iterate) add actor_name to actors table 
// 3a- get last actor_id
// 3b- add last actor_id & last movie_id to movies_actors_table 
// 4- add movie_id & theatre_id to theatres_movies_join table
function addMovie(req,res,next){}

// edit movie_id info in movies table
function editMovie(req,res,next){}

// delete from theatres_movies_join where movie_id=($1) and theatre_id=($2)
function deleteMovie(req,res,next){}

module.exports.showTheatres = showTheatres;
module.exports.showTheatreMovie = showTheatreMovie;
module.exports.getMovie = getMovie;
module.exports.addMovie = addMovie;
module.exports.editMovie = editMovie;
module.exports.deleteMovie = deleteMovie;