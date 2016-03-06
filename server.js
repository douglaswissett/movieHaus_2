require('dotenv').config();
'use strict'
var express = require('express');
var logger  = require('morgan');
var path    = require('path');
var db      = require('./db/pgp.js');
var app = express();


app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));


// HOMEPAGE
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// THREATRES
app.get('/theatres', db.showTheatres, (req, res) => {
  // takes db.showThreatres
  var data = res.rows;
  res.send(data);
});

app.get('/theatres/:id', db.showTheatreMovie, (req, res) => {
  // takes db.showTheatreMovies
  var data = res.rows;
  res.send(data);  
});
app.post('/theatres/:id', (req, res) => {
  // takes db.addMovie
  // redirect to some route
});

// MOVIES
app.get('/movies/:id', db.getMovie, (req, res) => {
  // takes db.getMovie
  var data = res.rows;
  res.send(data);
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
