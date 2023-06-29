import React from 'react';


import type { Movie } from '../interfaces/Movie';
import RoundButton from './style/RoundButton';

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
    <>
      <div className="bg-gray-900 shadow-md rounded-none p-4 sm:flex sm:items-center sm:justify-start">
        <img src={movie.poster} alt="placeholder" className="w-[150px] h-[150px] rounded-none object-cover mr-4 mb-4 sm:mb-0" />
        <div>
          <h2 className="text-lg font-semibold mb-2">{movie.title}</h2>
          <h3 className="text-sm font-medium text-gray-200 mb-1">{movie.year}</h3>
          <h3 className="text-sm font-medium text-gray-200">{movie.genre}</h3>
          <h3 className="text-xs font-medium text-gray-200 mb-3">{movie.actors}</h3>
          <RoundButton
            buttonId="movie-add"
            ariaLabel="add a movie"
            onClick={() => console.log('C L I C K E D')}
          >
            WATCHED
          </RoundButton>
        </div>
      </div>
    </>
  )
}

export default MovieListEntry;

/*

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
*/