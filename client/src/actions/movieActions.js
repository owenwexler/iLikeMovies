import axios from 'axios';

import {
  getMoviesFromAPI,
  postMovieToAPI,
  toggleMovieToAPI,
  deleteMovieToAPI
} from '../helper/apiCalls';

export const movieActionTypes = {
  SET_MOVIES: 'SET_MOVIES',
  POST_MOVIE: 'POST_MOVIE'
};

/**
 * Returns Redux Thunk function that initiates an axios request
 *    and dispatches the response as a 'SET_MOVIES' action
 * @returns {function} - Redux Thunk function.
 */
export const getMovies = () => {
  return (dispatch) => {
    return getMoviesFromAPI()
      .then(data => {
        dispatch({
          type: movieActionTypes.SET_MOVIES,
          payload: data
        });
      });
  }
}

export const postMovie = (movieTitle) => {
  return (dispatch) => {
    return postMovieToAPI()
      .then(data => {
        dispatch({
          type: movieActionTypes.SET_MOVIES,
          payload: data
        });
      });
  }
}

export const toggleMovieWatched = (movie) => {
  return (dispatch) => {
    return toggleMovieToAPI(movie)
      .then(data => {
        dispatch({
          type: movieActionTypes.SET_MOVIES,
          payload: data
        });
      });
  }
}