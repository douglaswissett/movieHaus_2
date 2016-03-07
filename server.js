require('dotenv').config();
'use strict'
var express = require('express');
var logger  = require('morgan');
var path    = require('path');
var bodyParser = require('body-parser');
var db      = require('./db/pgp.js');
var app = express();


app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


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
app.post('/theatres/:id', db.addMovie, (req, res) => {
  // takes db.addMovie
  // redirect to some route
  res.send(req.body);
});

// MOVIES
app.get('/movies/:id', db.getMovie, (req, res) => {
  // takes db.getMovie
  var data = res.rows;
  res.send(data);
});
app.put('/movies/:id', db.editMovie, (req, res) => {
  // takes db.editMovie
  // redirect to some route
  res.send(req.body);
});
app.delete('/movies/:id', db.deleteMovie, (req, res) => {
  // takes db.deleteMovie
  // redirect to some route
  res.send(req.body);
});





var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('listening on ', port);
});
