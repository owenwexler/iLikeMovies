import React from 'react';
import PropTypes from 'prop-types';

import {useDispatch } from 'react-redux';

import { toggleMovieWatched } from '../actions/movieActions.js';

const MovieListEntry = ({movie}) => {
  const dispatch = useDispatch();
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
          onClick={() => dispatch(toggleMovieWatched(movie.title))}>
            {watchedUnwatchedButtonAttributes[0]}
        </button>
      </div>
    </div>
  )
}

export default MovieListEntry;
