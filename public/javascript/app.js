$(document).ready(()=> {
  var $container = $('#container');
  // render homepage on load
  renderHome();

  /* Render functions */
  function renderHome() {
    $.get('/theatres')
    .done((data)=> {
      $container.empty();
      $container.append($('<div>').addClass('row'));
      $('.row').append($('<div>').attr('id', 'theatre-container').addClass('six columns'));
      $('.row').append($('<div>').attr('id', 'movie-container').addClass('six columns'));

      var $theatresContainer = $('#theatre-container');
      for (var i = 0; i < data.length; i++) {
        var div = $('<div>').addClass('theatre').attr('id', 't'+ data[i].theatre_id).text(data[i].name);
        $theatresContainer.append(div);
      }
      theatreEvent();
    })
  }

  function renderProfile(data, tid) {
    $container.empty();
    $container.append($('<div>').addClass('row'));
    $('.row').append($('<div>').attr('id', 'profile-container').addClass('six columns'));
    $('.row').append($('<div>').attr('id', 'profile-img').addClass('six columns'));
    $('#profile-container').append($('<h2>').text(data.title + ' (' + data.year + ')'));
    $('#profile-container').append($('<p>').text('Rating: ' + data.rating));
    $('#profile-container').append($('<p>').text('Directors: ' + data.director));
    $('#profile-container').append($('<p>').text('Actors: ' + data.actors));
    $('#profile-container').append($('<p>').text('Plot: ' + data.plot));
    $('#profile-img').append(`<img src=${data.img_url}>`);

    $('#profile-container').append($('<button>').text('Edit').attr('id', 'edit'));
    $('#edit').click((event)=> {
      editMovie(data, tid);
    })
    $('#profile-container').append($('<button>').text('Delete').attr('id', 'delete'));
    $('#delete').click((event)=> {
      removeMovie(data, tid);
    })          
  }



  /* Event functions */
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
        movieEvent(tid);
      })
    })
  }

  function movieEvent(tid) {
    $('.movie').click((event)=> {
      var mid = event.target.id;
      mid = mid.slice(1);

      $.get('/movies/' + mid)
      .done((data)=> {
        // paint profile page
        renderProfile(data, tid);
      })
    })
  }

  function editMovie(data, tid) {
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
        `<input type="text" name="showtimes" placeholder="Edit Showtimes">`,
        `<input type="hidden" name="img_url" value="${data.img_url}">`,
        `<input type="hidden" name="tid" value="${tid}">`,
        `<input type="hidden" name="mid" value="${data.movie_id}">`,
        '<input type="submit" value="Edit">'
      );
    submitEdit(data);
  }

  function submitEdit(data) {
    var mid = data.movie_id;

    $('#editForm').submit((event) => {
      event.preventDefault();

      $.ajax({
        url: '/movies/'+ mid, 
        type: 'PUT',
        data: $('#editForm').serialize()
      })
      .done( (data) => {
        renderProfile(data);
      })
    });
  }
  
  function removeMovie(data, tid) {
    var mid = data.movie_id;

    $.ajax({
      url: '/movies/' + mid,
      type: 'DELETE',
      data: {tid: tid}
    })
    .done((data)=> {
      renderHome();
    });
  }


  function submitAdd() {
    $('.addBtns').submit((event) => {
      event.preventDefault();
      var omdbID = event.target.id;
      var tid = $("select[name='dropDown']").val();

      $.get('http://www.omdbapi.com/?i='+ omdbID)
      .done( (data) => {
        console.log(data);
       $.ajax({
        url: '/theatres/'+ tid,
        dataType: 'json',
        data: data,
        type: 'post'
       })
       .done( () => {
        console.log('made it home!');
        //renderHome();
       });
      });
    });
  }


  /* Nav-bar */
  $('#home').click((event) => {
    renderHome();
  });

  $('#searchForm').submit((event) => {
    event.preventDefault();
    $container.empty();
    $container.append($('<div>').addClass('row'));
    $('.row').append($('<div>').attr('id', 'results-container').addClass('six columns'));
    $('.row').append($('<div>').attr('id', 'add-container').addClass('six columns'));

    var title = event.target[0].value;
    $.get('http://www.omdbapi.com/?s=' + title) // need to request again using id for more detail
    .done( (data) => {
      var $results = $('#results-container');
      
      data.Search.forEach((movie) => {
        var div = $('<div>').addClass('results');
        var ul = $('<ul>');
        var form = $('<form>').attr('id', movie.imdbID).addClass('addBtns');
        var select = $('<select name="dropDown">');
        select.append(
          `<option value="1">AMC Times Square</option>`,
          `<option value="2">Regal Cinemas Union Square</option>`,
          `<option value="3">AMC Loews 34th Street</option>`
        );
        form.append(select, $('<input type="submit" value="Add Movie">'));

        ul.append(
          `<li class="result-list">${movie.Title}</li>`,
          `<li class="result-list">${movie.Year}</li>`,
          `<li class="result-list">${movie.imdbID}</li>`,
          `<img src="${movie.Poster}">`
        );

        div.append(ul, form);
        $results.append(div);
      });
      
      submitAdd();
    });
  });


})
