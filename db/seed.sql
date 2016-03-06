-- three theaters
INSERT INTO theatres(name) VALUES('AMC Times Square');
INSERT INTO theatres(name) VALUES('Regal Cinemas Union Square');
INSERT INTO theatres(name) VALUES('AMC Loews 34th Street');

-- adding a movie
INSERT INTO movies(title, img_url, year, rating, director, plot, actors) 
  VALUES('Showgirls', 'http://imgc.allpostersimages.com/images/P-488-488-90/40/4023/BSTWF00Z/posters/showgirls-spanish-movie-poster-1995.jpg', 1995, 4.6, 'Paul Verhoeven', 
        'A young drifter, named Nomi, arrives in Las Vegas to become a dancer and soon sets about clawing and pushing her way to become the top of the Vegas showgirls.',
        'Elizabeth Berkley, Kyle MacLachlan, Gina Gershon, Glenn Plummer');

-- adding showtimes to movie
INSERT INTO theatre_movie_showtime(showTime, theatre_id, movie_id) 
  VALUES('11:30', 1, 1);
INSERT INTO theatre_movie_showtime(showTime, theatre_id, movie_id) 
  VALUES('8:30', 1, 1);