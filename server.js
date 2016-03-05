require('dotenv').config();
'use strict'
var express = require('express');
var logger  = require('morgan');
var path    = require('path');
var app = express();


app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));


// HOMEPAGE
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// THREATRES
app.get('/theatres', (req, res) => {
  // takes db.showThreatres
  //res.send(res.rows);
});

app.get('/theatres/:id', (req, res) => {
  // takes db.showTheatreMovies
  //res.send(res.rows);
});
app.post('/theatres/:id', (req, res) => {
  // takes db.addMovie
  // redirect to some route
});

// MOVIES
app.get('/movies/:id', (req, res) => {
  // takes db.getMovie
  // res.send(res.rows)
});
app.put('/movies/:id', (req, res) => {
  // takes db.editMovie
  // redirect to some route
});
app.delete('/movies/:id', (req, res) => {
  // takes db.deleteMovie
  // redirect to some route
});





var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('listening on ', port);
});
