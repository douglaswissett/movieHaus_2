DROP TABLE if exists theatres CASCADE;
DROP TABLE if exists movies CASCADE;
DROP TABLE if exists actors CASCADE;
DROP TABLE if exists theatres_movies_join CASCADE;
DROP TABLE if exists movies_actors_join CASCADE;

CREATE TABLE theatres (   
  theatre_id serial PRIMARY KEY UNIQUE,
  name VARCHAR(255)
);

CREATE TABLE movies (   
  movie_id serial PRIMARY KEY UNIQUE,
  name VARCHAR(255),
  img_url VARCHAR(255),
  title VARCHAR(255),
  year int,
  rating numeric,
  director VARCHAR(255),
  plot VARCHAR(255),
  showTimes VARCHAR(255)
);

CREATE TABLE actors (   
  actor_id serial PRIMARY KEY UNIQUE,
  name VARCHAR(255)
);

CREATE TABLE theatres_movies_join (
  theatre_id integer REFERENCES theatres ON DELETE CASCADE,
  movie_id integer REFERENCES movies ON DELETE CASCADE,
  PRIMARY KEY (theatre_id, movie_id)
);

CREATE TABLE movies_actors_join (
  movie_id integer REFERENCES movies ON DELETE CASCADE,
  actor_id integer REFERENCES actors ON DELETE CASCADE,
  PRIMARY KEY (movie_id, actor_id)
);