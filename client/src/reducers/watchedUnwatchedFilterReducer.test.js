import { watchedUnwatchedFilterActionTypes } from '../actions/watchedUnwatchedFilterActions.js';
import { watchedUnwatchedFilter } from './watchedUnwatchedFilterReducer';

test('returns default initial state of `false` when no action is passed', () => {
  const newState = watchedUnwatchedFilter(undefined, {});
  expect(newState).toEqual('all');
});

test('returns state of `watched` upon receiving an action of type `SET_WATCHED`', () => {
  const newState = watchedUnwatchedFilter(undefined, { type: watchedUnwatchedFilterActionTypes.SET_WATCHED });
  expect(newState).toEqual('watched');
});

test('returns state of `unwatched` upon receiving an action of type `SET_UNWATCHED`', () => {
  const newState = watchedUnwatchedFilter(undefined, { type: watchedUnwatchedFilterActionTypes.SET_UNWATCHED });
  expect(newState).toEqual('unwatched');
});

test('returns state of `all` upon receiving an action of type `SET_ALL`', () => {
  const newState = watchedUnwatchedFilter(undefined, { type: watchedUnwatchedFilterActionTypes.SET_ALL });
  expect(newState).toEqual('all');
});
