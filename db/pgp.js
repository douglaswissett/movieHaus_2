'use strict'
var pgp     = require('pg-promise')({});
var cn = {
  host: 'localhost',
  port: 5432,
  database: 'moviehaus2',
  user: process.env.DB_USER,
  password: process.env.DB_PASS
}
var db = pgp(cn);

// show all theatres in theatres table
function showTheatres(req,res,next){
  db.many(`SELECT * FROM theatres;`)
    .then((data)=>{
      console.log(data);    // should get multiple theatre names
      res.rows = data;
      next();
    })
    .catch(()=>{
      console.log('ERROR in showing ALL THEATRES!');
    })
}

// show all movies in the theatre
// get all movie_id from theatres_movies_join table where theatre_id=($1)
function showTheatreMovie(req,res,next){
  // var tID = req.params.id;
  db.many(`SELECT m.movie_id, m.title, array_to_string(array_agg(tms.showtime), ',') showtimes
          FROM movies m INNER JOIN theatre_movie_showtime tms
          ON m.movie_id = tms.movie_id WHERE tms.theatre_id = ($1)
          GROUP BY m.movie_id;`, [req.params.id])
    .then((data)=>{
      console.log(data);  // should get multiple movies in a theatre
      res.rows = data;
      next();
    })
    .catch(()=>{
      console.log('ERROR in showing ALL MOVIES IN A THEATRE!');
      next();
    })
}

// get all info of a movie
function getMovie(req,res,next){
  // var mID = req.params.id;
  db.one(`SELECT * FROM movies WHERE movie_id=($1);`, [req.params.id])
    .then((data)=>{
      console.log(data);  // should get all info of a movie
      res.rows = data;
      next();
    })
    .catch(()=>{
      console.log('ERROR in GETTING MOVIE PROFILE!');
    })
}

// gets most recent movie_id
function addShowtime(time, tID, mID){
  db.none(`INSERT INTO theatre_movie_showtime(showTime, theatre_id, movie_id) VALUES($1,$2,$3);`,
          [time, tID, mID])
    .then(()=>{
      console.log('ADDED SHOWTIME SUCCESSFUL');
    })
    .catch(()=>{
      console.log('ERROR in ADDING SHOWTIME!');
    })
}

// 1- add movie to movies table
// 2- get last movie_id
// 3- (iterate) add each showTime to theatre_movie_showtime WHERE movie_id AND theatre_id
function addMovie(req,res,next){
  // var tID = req.params.id;
  db.one(`INSERT INTO movies(title, img_url, year, rating, director, plot, actors) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING movie_id;`,
          [req.body.Title, req.body.Poster, req.body.Year, req.body.imdbRating, req.body.Director, req.body.Plot, req.body.Actors])
    .then((data)=>{
      console.log(data.movie_id);      // need to get movie_id
      //var showTimes = req.body.showtimes.split(' ');   // string or array?
      // iterate & add each showTime to theatre_movie_showtime table
      // showTimes.forEach((time)=>{
      //   addShowtime(time, req.params.id, req.body.mid);
      // });
      next();
    })
    .catch(()=>{
      console.log('ERROR in ADDING MOVIE!');
    })
}

// edit movie_id info in movies table + add showtimes
function editMovie(req,res,next){
  // var mID = req.params.id;
  db.none(`UPDATE movies SET title=($1), year=($2), rating=($3), director=($4), plot=($5), actors=($6) WHERE movie_id=($7);`,
          [req.body.title, req.body.year, req.body.rating, req.body.director, req.body.plot, req.body.actors, req.params.id])
    .then(()=>{
      var showTimes = req.body.showtimes.split(' '); // string?? or array??
      showTimes.forEach((time)=>{
        addShowtime(time, req.body.tid, req.params.id);
      });
      console.log('UPDATED NEW MOVIE INFO & SHOWTIMES!');     // testing status for UPDATE
      next();
    })
    .catch((error)=>{
      console.log('ERROR in EDITING MOVIE DETAILS!', error);
    })
}

// delete from theatre_movie_showtime where movie_id=($1) and theatre_id=($2);
function deleteMovie(req,res,next){
  // var mID = req.params.id;
  db.none(`DELETE FROM theatre_movie_showtime WHERE movie_id=($1) AND theatre_id=($2);`,
          [req.params.id, req.body.tid])   // how do we differentiate btw movie_id & theatre_id ??
    .then(()=>{
      console.log('DELETE COMPLETED!');     // testing status for DELETE
      next();
    })
    .catch(()=>{
      console.log('ERROR in DELETING MOVIE!');
    })
}

module.exports.showTheatres = showTheatres;
module.exports.showTheatreMovie = showTheatreMovie;
module.exports.getMovie = getMovie;
module.exports.addMovie = addMovie;
module.exports.editMovie = editMovie;
module.exports.deleteMovie = deleteMovie;
