$(document).ready(()=> {
  var $theatersContainer = $('#theatre-container');
  var $moviesContainer = $('#movie-container');
  var $profileContainer = $('#profile-container')

  $.get('/theatres')
  .done((data)=> {
    $theatresContainer.empty();
    for (var i = 1; i <= data.length; i++) {
      var div = $('<div>').addClass('theatre').attr('id', 't'+ i).text(data[i].name);
      $theatresContainer.append(div);
    }
  })

  $('.theatre').click((event)=> {
    var tid = event.target.id;
    // what is tid??
    $.get('/theatre/' + tid)
    .done((data)=> {
      $moviesContainer.empty();
      for (var i = 1; i <= data.length; i++) {
        var div = $('<div>').addClass('movie').attr('id', 'm'+ i).text(data[i].name);
        $moviesContainer.append(div);
      }
    })
  })

  $('.movie').click((event)=> {
    var mid = event.target.id;
    // what is tid??
    $.get('/movies/' + mid)
    .done((data)=> {
      $moviesContainer.empty();
      $theatresContainer.empty();
      //need to add other attributes of movie
      var div = ($('<div>').text(data[i].name));
      $profileContainer.append(div);
    })
  })

})
