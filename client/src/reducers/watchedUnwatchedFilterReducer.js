/**
 * @function watchedUnwatchedFilterReducer
 * @param {boolean} state - current movie display filter - options: 'all', 'watched', 'unwatched'
 * @param {action} action - action to dispatch
 */

export const watchedUnwatchedFilterInitState = 'all';

export const watchedUnwatchedFilter = (state = watchedUnwatchedFilterInitState, action) => {
  switch(action.type) {
    case 'SET_WATCHED':
      return 'watched';
    case 'SET_UNWATCHED':
      return 'unwatched';
    case 'SET_ALL':
      return 'all';
    default:
      return state;
  }
}