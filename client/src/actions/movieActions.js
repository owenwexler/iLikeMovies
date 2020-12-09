import axios from 'axios';

export const movieActionTypes = {
  SET_MOVIES: 'SET_MOVIES',
  POST_MOVIE: 'POST_MOVIE'
};

/**
 * Returns Redux Thunk function that initiates an axios request
 *    and dispatches the response as a 'SET_SECRET_WORD' action
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