$(document).ready(()=> {
  var $container = $('#container');
  
  
  // var $profileContainer = $('#profile-container');

  renderHome();
  function renderHome() {
    $.get('/theatres')
    .done((data)=> {
      $container.empty();
      $container.append($('<div>').attr('id', 'theatre-container'));
      $container.append($('<div>').attr('id', 'movie-container'));

      var $theatresContainer = $('#theatre-container');  
      for (var i = 0; i < data.length; i++) {
        var div = $('<div>').addClass('theatre').attr('id', 't'+ data[i].theatre_id).text(data[i].name);
        $theatresContainer.append(div);
      }
      theatreEvent();
    })  
  }
  
  function theatreEvent() {
    $('.theatre').click((event)=> {
      var tid = event.target.id;
      tid = tid.slice(1);
      
      $.get('/theatres/' + tid)
      .done((data)=> {
        $('#movie-container').empty();
        var $moviesContainer = $('#movie-container');
        
        var h2 = $('<h2>').text('Movie List');
        var ul = $('<ul>');
        $moviesContainer.append(h2);
        data.forEach((el) => {
          var li = $('<li>').text(el.title).attr('id', 'm'+el.movie_id).addClass('movie');
          ul.append(li);
        });
        $moviesContainer.append(ul);
        movieEvent();
      })
    })
  }
    
  
  function movieEvent() {
    $('.movie').click((event)=> {
      var mid = event.target.id;
      mid = mid.slice(1);
      

      $.get('/movies/' + mid)
      .done((data)=> {
        $container.empty();
        //need to add other attributes of movie

      })
    })
  }  
      
  
  

  $('#searchForm').submit((event) => {
    event.preventDefault();

    $container.empty();

  });
})
