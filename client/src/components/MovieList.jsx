import React from 'react'
import MovieListEntry from './MovieListEntry';
import { filterMovies } from '../helper/helper.js';

const MovieList = ({movies, watchedUnwatchedFilter}) => {

  let contents;

  let watchedMovies = movies.filter(movie => movie.watched === true);

  let noWatched = (watchedUnwatchedFilter === 'watched' && watchedMovies.length === 0);

  let filteredMovies = filterMovies(movies, watchedUnwatchedFilter).reverse();

  if (movies.length === 0) {
    contents = <span data-test="movie-instructions"><h3>Add some movies here!</h3></span>
  } else if (noWatched) {
    filteredMovies = filterMovies(movies, 'all').reverse();
    contents = filteredMovies.map(movie => <MovieListEntry key={movie.movieListId} movie={movie} data-test="movie-list-entry" />);
  } else {
    contents = filteredMovies.map(movie => <MovieListEntry key={movie.movieListId} movie={movie} data-test="movie-list-entry" />);
  }

  return (
    <div data-test="component-movie-list">
      {noWatched ? <span data-test="no-watched-alert"><h3>No movies watched.  Showing all movies.</h3></span> : null}
      {contents}
    </div>
  )
}

export default MovieList;