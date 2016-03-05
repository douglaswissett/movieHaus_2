DROP TABLE if exists theatres CASCADE;
DROP TABLE if exists movies CASCADE;
DROP TABLE if exists theatre_movie_showtime CASCADE;

CREATE TABLE theatres (   
  theatre_id serial PRIMARY KEY UNIQUE,
  name VARCHAR(255)
);

CREATE TABLE movies (   
  movie_id serial PRIMARY KEY UNIQUE,
  title VARCHAR(255),
  img_url VARCHAR(255),
  year int,
  rating numeric,
  director VARCHAR(255),
  plot VARCHAR(255),
  actors VARCHAR(255)
);

-- showTime for each movie_theatre pair
CREATE TABLE theatre_movie_showtime (
  showTime_id serial PRIMARY KEY UNIQUE,
  showTime timestamp,
  theatre_id integer REFERENCES theatres ON DELETE CASCADE,
  movie_id integer REFERENCES movies ON DELETE CASCADE
);

-- CREATE TABLE theatres_movies_join (
--   theatre_id integer REFERENCES theatres ON DELETE CASCADE,
--   movie_id integer REFERENCES movies ON DELETE CASCADE,
--   PRIMARY KEY (theatre_id, movie_id)
-- );