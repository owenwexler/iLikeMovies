CREATE DATABASE ilikemovies_dev;

CREATE TABLE IF NOT EXISTS users (
  user_id VARCHAR(35),
  user_name VARCHAR(50),
  UNIQUE (user_id),
  PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS movies (
  movie_name TEXT,

)
