$(document).ready(()=> {
  var $theatersContainer = $('#theatre-container');
  var $moviesContainer = $('#movie-container');

  $.get('/theatres')
  .done((data)=> {
    $theatresContainer.empty();
    for (var i = 1; i <= data.length; i++) {
      var div = $('<div>').addClass('theatre').attr('id', 't'+ i).text(data[i].name);
      $theatresContainer.append(div);
    }
  })

  $.get('/movies')
  .done((data)=> {
    $moviesContainer.empty();
    for (var i = 0; i < data.length; i++) {
      var div = $('<div>').addClass('movies').attr('id', 'm'+ i).text(data[i].name);
      $moviesContainer.append(div);
    }
  })

  $('.theatre').click((event)=> {
    var tid = event.target.id
    $.get('/theatre/:id')
    .done((data)=> {

    })
  })





}
