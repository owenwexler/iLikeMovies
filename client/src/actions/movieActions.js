import axios from 'axios';

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
    return axios.get('api/movies/')
      .then(response => {
        dispatch({
          type: movieActionTypes.SET_MOVIES,
          payload: response.data
        });
      });
  }
}

export const postMovie = (movieTitle) => {
  return (dispatch) => {
    return axios.post(`api/movies?movie=${movieTitle}`)
      .then (response => {
        dispatch({
          type: movieActionTypes.POST_MOVIE,
          payload: response.data
        });
      });
  }
}

export const toggleMovieWatched = (id) => {
  return (dispatch) => {
    return axios.put(`api/movie/watched?id=${id}`)
      .then (response => {
        dispatch(getMovies());
      });
  }
}