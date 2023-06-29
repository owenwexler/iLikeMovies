import React from 'react'
import MovieListEntry from './MovieListEntry';
import { filterMovies } from '../helper/helper.js';

import type { Movie } from '../interfaces/Movie';

interface MovieListProps {
  movies: Movie[],
  watchedUnwatchedFilter: 'all' | 'watched' | 'unwatched'
}

const MovieList: React.FC<MovieListProps> = ({movies, watchedUnwatchedFilter}) => {

  let contents;

  let watchedMovies = movies.filter(movie => movie.watched === true);

  let noWatched = (watchedUnwatchedFilter === 'watched' && watchedMovies.length === 0);

  let filteredMovies: Movie[] | undefined = filterMovies(movies, watchedUnwatchedFilter);

  let reversedFilteredMovies = filteredMovies?.reverse();

  if (movies.length === 0) {
    contents = <span data-test="movie-instructions"><h3>Add some movies here!</h3></span>
  } else if (noWatched) {
    filteredMovies = filterMovies(movies, 'all');
    reversedFilteredMovies = filteredMovies?.reverse();
    contents = reversedFilteredMovies?.map(movie => <MovieListEntry key={movie.title} movie={movie} data-test="movie-list-entry" />);
  } else {
    contents = reversedFilteredMovies?.map(movie => <MovieListEntry key={movie.title} movie={movie} data-test="movie-list-entry" />);
  }

  return (
    <div className="bg-gray-900 flex flex-row" data-test="component-movie-list">
      {noWatched ? <span data-test="no-watched-alert"><h3>No movies watched.  Showing all movies.</h3></span> : null}
      {contents}
    </div>
  )
}

export default MovieList;