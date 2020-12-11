import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setAll, setWatched, setUnwatched } from '../actions/watchedUnwatchedFilterActions.js';

const WatchedUnwatchedToggle = () => {
  const watchedUnwatchedFilter = useSelector(state => state.watchedUnwatchedFilter);
  const dispatch = useDispatch();

  return (
    <div data-test="watched-unwatched-component">
      <input type="radio"
      value="all"
      name="all"
      data-test="button-all"
      checked={watchedUnwatchedFilter === 'all'}
      onClick={() => dispatch(setAll())}
      /> All Movies

      <input type="radio"
      value="watched"
      name="watched"
      data-test="button-watched"
      checked={watchedUnwatchedFilter === 'watched'}
      onClick={() => dispatch(setWatched())}
      />Watched

      <input type="radio"
      value="unwatched"
      name="unwatched"
      data-test="button-unwatched"
      checked={watchedUnwatchedFilter === 'unwatched'}
      onClick={() => dispatch(setUnwatched())}
      /> To Watch
    </div>
  )
}

export default WatchedUnwatchedToggle;
