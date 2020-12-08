import { combineReducers } from 'redux';
import { watchedUnwatchedFilter } from './watchedUnwatchedFilterReducer.js'
import { movies } from './movieReducer.js';

export default combineReducers({
  movies,
  watchedUnwatchedFilter
});