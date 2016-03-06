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
          var li = $('<li>').text(el.title + ': ' + el.showtimes.split(',').join(' & ')).attr('id', 'm'+el.movie_id).addClass('movie');
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

        console.log(data);

        $container.append($('<div>').attr('id', 'profile-container'));
        $container.append($('<div>').attr('id', 'profile-img'));
        $('#profile-container').append($('<h2>').text(data.title + ' (' + data.year + ')'));
        $('#profile-container').append($('<p>').text('Rating: ' + data.rating));
        $('#profile-container').append($('<p>').text('Directors: ' + data.director));
        $('#profile-container').append($('<p>').text('Actors: ' + data.actors));
        $('#profile-container').append($('<p>').text('Plot: ' + data.plot));
        $('#profile-img').append(`<img src=${data.img_url}>`);

        $('#profile-container').append($('<button>').text('Edit').attr('id', 'edit'));
        $('#edit').click((event)=> {
          editMovie(data);
        })
        $('#profile-container').append($('<button>').text('Delete').attr('id', 'delete'));
        var $delete = $('#delete');
        $delete.click((event)=> {
          removeMovie();
        })
      })
    })
  }

  function editMovie(data) {
    $('#profile-container').empty()
    .append(
        `<div id="edit-container">`);
      $('#edit-container').append(
        `<form id="editForm">`);
      $('#editForm').append(
        `<input type="text" name="title" placeholder="${data.title}">`,
        `<input type="int" name="year" placeholder="${data.year}">`,
        `<input type="int" name="rating" placeholder="${data.rating}">`,
        `<input type="text" name="director" placeholder="${data.director}">`,
        `<input type="text" name="plot" placeholder="${data.plot}">`,
        `<input type="text" name="actors" placeholder="${data.actors}">`,
        '<input type="submit" value="Edit">'
      );
    submitEdit(data);
  }

  function submitEdit(data) {
    $('#editForm').submit((event) => {
      event.preventDefault();
      //need to grab movie id(mid)
    //   $.ajax('/movies/' + data.movie_id, {
    //     type: PUT
    //   })
    //   .done(data)=> {
    //
    //   }
        console.log('yoyoyo');
    })
  }

  // function removeMovie() {
  //   //need to grab movie id(mid)
  //   $.ajax('/movies/' + mid, {
  //     type: DELETE
  //   })
  //   .done(data)=> {
  //
  //   }
  // }



  $('#searchForm').submit((event) => {
    event.preventDefault();
    $container.empty();
    var title = event.target[0].value;
    $.get('http://www.omdbapi.com/?s=' + title) // need to request again using id for more detail
    .done( (data) => {
      console.log(data);
    });
  });

})
