var pgp     = require('pg-promise')({});
var cn = {
  host: 'localhost',
  port: 5432,
  database: 'moviehaus2',
  user: process.env.DB_USER,
  password: process.env.DB_PASS
}
var db      = pgp(cn);

// show all theatres in theatres table
function showTheatres(req,res,next){
  db.many("SELECT * FROM theatres;")
    .then(function(data){
      console.log(data);    // should get multiple theatre names
      res.rows = data;
      next();
    })
    .catch(function(){
      console.log('ERROR in showing ALL THEATRES!');
    })
}

// show all movies in the theatre
// get all movie_id from theatres_movies_join table where theatre_id=($1)
function showTheatreMovie(req,res,next){
  // var tID = req.params.id;
  db.many("SELECT * FROM movies m " + 
          "INNER JOIN theatres_movies_join tmj " + 
          "ON m.movie_id = tmj.movie_id " + 
          "WHERE tmj.theatre_id = ($1);", [req.params.id])
    .then(function(data){
      console.log(data);  // should get multiple movies in a theatre
      res.rows = data;
      next();
    })
    .catch(function(){
      console.log('ERROR in showing ALL MOVIES IN A THEATRE!');
    })
}

// get all info of a movie
function getMovie(req,res,next){
  // var mID = req.params.id;
  db.one("SELECT * FROM movies WHERE movie_id=($1);", [req.params.id])
    .then(function(data){
      console.log(data);  // should get all info of a movie
      res.rows = data;
      next();
    })
    .catch(function(){
      console.log('ERROR in getting MOVIE DETAILS!');
    })
}

// 1- add movie to movies table 
// 2- get last movie_id
// 3- (iterate) add actor_name to actors table 
// 3a- get last actor_id
// 3b- add last actor_id & last movie_id to movies_actors_table 
// 4- add movie_id & theatre_id to theatres_movies_join table
function addMovie(req,res,next){}

// edit movie_id info in movies table
function editMovie(req,res,next){
  // var mID = req.params.id;
  db.none("UPDATE movies SET title=($1), year=($2), rating=($3), director=($4), " +
          "actors=($5), plot=($6), showTimes=($7) WHERE movie_id=($8);",
          [req.body.title, req.body.year, req.body.rating, req.body.director, req.body.actors, req.body.plot, req.body.showTimes, req.params.id])
    // how to update actors??? since its an array of actors 
    .then(function(){

    })
    .catch(function(){

    })
}

// delete from theatres_movies_join where movie_id=($1) and theatre_id=($2)
function deleteMovie(req,res,next){
  // var mID = req.params.id;
}

module.exports.showTheatres = showTheatres;
module.exports.showTheatreMovie = showTheatreMovie;
module.exports.getMovie = getMovie;
module.exports.addMovie = addMovie;
module.exports.editMovie = editMovie;
module.exports.deleteMovie = deleteMovie;