'use strict'
var express = require('express');
var logger  = require('morgan');
var path    = require('path');
var app = express();


app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));


// homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// theatres route
app.get('/theatres', (req, res) => {
  // takes db.showThreatres
  //res.send(res.rows);
});

app.get('/theatres/:id', (req, res) => {
  // takes db.showTheatreMovies
  //res.send(res.rows);
});





var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('listening on ', port);
});
