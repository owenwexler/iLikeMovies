import React from 'react'
import movieContext from '../../contexts/movieContext.js';

const MovieList = () => {
  const [movies] = movieContext.useMovies();

  let contents;

  if (movies.length === 0) {
    contents = <span data-test="movie-instructions"><h3>Add some movies here!</h3></span>
  } else {
    contents = movies.map(movie => <h3 data-test="movie-list-entry">{movie.title}</h3>)
  }

  return (
    <div data-test="component-movie-list">
      {contents}
    </div>
  )
}

export default MovieList;
