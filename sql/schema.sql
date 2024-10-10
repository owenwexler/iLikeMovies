CREATE DATABASE ilikemovies_dev;

CREATE TABLE IF NOT EXISTS users (
  user_id VARCHAR(35) NOT NULL,
  user_name VARCHAR(50) NOT NULL,
  UNIQUE (user_id),
  PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS user_movies (
  user_movie_id VARCHAR(35) NOT NULL,
  movie_name TEXT NOT NULL,
  imdb_id VARCHAR(50),
  user_id VARCHAR(50) REFERENCES users(user_id),
  watched BOOLEAN,
  UNIQUE (user_movie_id),
  PRIMARY KEY (user_movie_id)
);

CREATE USER ilikemovies WITH PASSWORD 'ilikemovies123';

GRANT SELECT ON ALL TABLES IN SCHEMA public TO ilikemovies;
GRANT INSERT ON ALL TABLES IN SCHEMA public TO ilikemovies;
GRANT UPDATE ON ALL TABLES IN SCHEMA public TO ilikemovies;
GRANT DELETE ON ALL TABLES IN SCHEMA public TO ilikemovies;

INSERT INTO users (user_id, user_name) VALUES ('01J9W2QWVYK5SA1DJ06Q21ZCFW', 'owenwexler');

INSERT INTO user_movies (user_movie_id, movie_name, imdb_id, user_id, watched) VALUES ('01J9W2QWVZSX7K4600S2CNZE0S', 'Lean On Me', 'tt009722', '01J9W2QWVYK5SA1DJ06Q21ZCFW', FALSE);
INSERT INTO user_movies (user_movie_id, movie_name, imdb_id, user_id, watched) VALUES ('01J9W2QWW08FK0373P4VZ0JK9F', 'Star Wars', 'tt0076759', '01J9W2QWVYK5SA1DJ06Q21ZCFW', FALSE);
INSERT INTO user_movies (user_movie_id, movie_name, imdb_id, user_id, watched) VALUES ('01J9W2QWW0PCC61FHXP4NH4ZCE`', 'PCU', 'tt0110759', '01J9W2QWVYK5SA1DJ06Q21ZCFW', FALSE);
INSERT INTO user_movies (user_movie_id, movie_name, imdb_id, user_id, watched) VALUES ('01J9W2QWW0KMWSVW8AA4EFAR78', 'Home Alone', 'tt0099785', '01J9W2QWVYK5SA1DJ06Q21ZCFW', FALSE);
INSERT INTO user_movies (user_movie_id, movie_name, imdb_id, user_id, watched) VALUES ('01J9W2QWW01FESPB07PVB7BS2A', 'Aladdin', 'tt0103639', '01J9W2QWVYK5SA1DJ06Q21ZCFW', FALSE);

CREATE INDEX idx_user_ids ON users (user_id);
CREATE INDEX idx_user_movie_ids ON user_movies (user_id);
CREATE INDEX idx_user_movie_names ON user_movies (movie_name);
CREATE INDEX idx_user_movie_imdb_ids ON user_movies (imdb_id);
