import React from 'react'
import MovieListEntry from './MovieListEntry';

const MovieList = ({movies}) => {

  let contents;

  if (movies.length === 0) {
    contents = <span data-test="movie-instructions"><h3>Add some movies here!</h3></span>
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