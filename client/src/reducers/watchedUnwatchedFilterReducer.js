/**
 * @function watchedUnwatchedFilterReducer
 * @param {boolean} state - current movie display filter - options: 'all', 'watched', 'unwatched'
 * @param {action} action - action to dispatch
 */

export const watchedUnwatchedFilterInitState = {
  watchedUnwatchedFilter: 'all'
};

export const watchedUnwatchedFilterReducer = (state = watchedUnwatchedFilterInitState, action) => {
  switch(action.type) {
    case 'SET_WATCHED':
      return {...state, watchedUnwatchedFilter: 'watched'};
    case 'SET_UNWATCHED':
      return {...state, watchedUnwatchedFilter: 'unwatched'};
    default:
      return state;
  }
}