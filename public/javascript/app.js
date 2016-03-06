$(document).ready(()=> {
  var $container = $('#container');
  
  
  // var $profileContainer = $('#profile-container');

  renderHome();
  function renderHome() {
    $.get('/theatres')
    .done((data)=> {
      console.log(data);
      $container.empty();
      $container.append($('<div>').attr('id', 'theatre-container'));
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

      $.get('/theatre/' + tid)
      .done((data)=> {
        
        $container.append($('<div>').attr('id', 'movie-container').addClass('exist'));
        var $moviesContainer = $('#movie-container');
        
        for (var i = 0; i < data.length; i++) {
          var div = $('<div>').addClass('movie').attr('id', 'm'+data[i].movie_id).text(data[i].name); // need to assign db movie id
          $moviesContainer.append(div);
        }
      })
    })
  }
    
  
  
    $('.movie').click((event)=> {
      var mid = event.target.id;
      mid = mid.slice(1);
      $.get('/movies/' + mid)
      .done((data)=> {
        $moviesContainer.empty();
        $theatresContainer.empty();
        //need to add other attributes of movie
        var div = $('<div>').text(data[i].name);
        $profileContainer.append(div);
      })
    })  
  
  

  $('#searchForm').submit((event) => {
    event.preventDefault();

    $container.empty();

  });
})
