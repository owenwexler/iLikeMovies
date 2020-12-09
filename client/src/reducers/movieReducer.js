import { movieActionTypes } from '../actions/movieActions.js';

/**
 * @function movies (reducer)
 * @param {string} state - State before reducer.
 * @param {object} action - Action sent to reducer.
 * @returns {string} - New state (movie payload from action).
 */
const movies = (state=[], action) => {
  switch (action.type) {
    case movieActionTypes.SET_MOVIES:
      return action.payload;
      // set movies replaces entire movies state with data fetched from API, so no need so spread previous state in this action
    case movieActionTypes.POST_MOVIE:
      return [...state, action.payload];
    default:
      return state;
  }
}

export { movies };