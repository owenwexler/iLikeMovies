import React from 'react'
import MovieListEntry from './MovieListEntry';

const MovieList = ({movies, watchedUnwatchedFilter}) => {

  let contents;

  let watchedMovies = movies.filter(movie => movie.watched === true);
  console.log('watchedMovies ', watchedMovies);

  if (movies.length === 0) {
    contents = <span data-test="movie-instructions"><h3>Add some movies here!</h3></span>
  } else if (watchedUnwatchedFilter === 'watched' && movies.length === 0) {
    contents = <span data-test="no-watched-alert"><h3>No movies watched.  Showing all movies.</h3></span>
    {movies.map(movie => <MovieListEntry key={movie.movieListId} movie={movie} data-test="movie-list-entry" />)};
  } else {
    contents = movies.map(movie => <MovieListEntry key={movie.movieListId} movie={movie} data-test="movie-list-entry" />);
  }

  return (
    <div data-test="component-movie-list">
      {contents}
    </div>
  )
}

export default MovieList;