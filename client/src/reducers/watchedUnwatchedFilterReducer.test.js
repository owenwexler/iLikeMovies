import { watchedUnwatchedFilterActionTypes } from '../actions/watchedUnwatchedFilterActions.js';
import { watchedUnwatchedFilterReducer } from './watchedUnwatchedFilterReducer';

test('returns default initial state of `false` when no action is passed', () => {
  const newState = watchedUnwatchedFilterReducer(undefined, {});
  expect(newState).toEqual({watchedUnwatchedFilter: 'all'});
});

test('returns state of `watched` upon receiving an action of type `SET_WATCHED`', () => {
  const newState = watchedUnwatchedFilterReducer(undefined, { type: watchedUnwatchedFilterActionTypes.SET_WATCHED });
  expect(newState).toEqual({watchedUnwatchedFilter: 'watched'});
});

test('returns state of `unwatched` upon receiving an action of type `SET_UNWATCHED`', () => {
  const newState = watchedUnwatchedFilterReducer(undefined, { type: watchedUnwatchedFilterActionTypes.SET_UNWATCHED });
  expect(newState).toEqual({watchedUnwatchedFilter: 'unwatched'});
});

test('returns state of `all` upon receiving an action of type `SET_ALL`', () => {
  const newState = watchedUnwatchedFilterReducer(undefined, { type: watchedUnwatchedFilterActionTypes.SET_ALL });
  expect(newState).toEqual({watchedUnwatchedFilter: 'all'});
});
