import React from 'react';


import type { Movie } from '../interfaces/Movie';

interface MovieListEntryProps {
  movie: Movie;
}

const MovieListEntry: React.FC<MovieListEntryProps> = ({ movie }) => {
  let watchedUnwatchedButtonAttributes;

  if (movie.watched) {
    watchedUnwatchedButtonAttributes = ['Watched', 'btn-success'];
  } else {
    watchedUnwatchedButtonAttributes = ['To Watch', 'btn-primary'];
  }

  return (
    <div data-test="component-movie-list-entry">
      <div>
        <img data-test="movielistentry-image" src={movie.poster} />
      </div>

      <div>
        <h3 data-test="movielistentry-title">
          {movie.title}
        </h3>
        <h4 data-test="movielistentry-year">
          {movie.year}
        </h4>
        <h5 data-test="movielistentry-genre">
          {movie.genre}
        </h5>
        <p data-test="movielistentry-actors">
          {movie.actors}
        </p>
        <button
          data-test="movielistentry-togglebutton"
          onClick={() => console.log(`toggle ${movie.title}`)}>
            {watchedUnwatchedButtonAttributes[0]}
        </button>
      </div>
    </div>
  )
}

export default MovieListEntry;

/*
<div className="bg-white shadow-md rounded-md p-4 sm:flex sm:items-center sm:justify-start">
  <img src="https://via.placeholder.com/60" alt="placeholder" class="w-16 h-16 rounded-full object-cover mr-4 mb-4 sm:mb-0">
  <div>
    <h2 class="text-lg font-semibold mb-2">Header</h2>
    <h3 class="text-sm font-medium text-gray-500 mb-1">Subheader 1</h3>
    <h3 class="text-sm font-medium text-gray-500">Subheader 2</h3>
  </div>
</div>
*/