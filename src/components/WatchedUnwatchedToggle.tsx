import React from 'react';

import { useAtom } from 'jotai';

import {
  watchedUnwatchedFilterAtom
} from '../store/jotaiStore';

const WatchedUnwatchedToggle = () => {
  const [watchedUnwatchedFilter, setWatchedUnwatchedFilter] = useAtom(watchedUnwatchedFilterAtom);

  return (
    <div data-test="watched-unwatched-component">
      <input type="radio"
      value="all"
      name="all"
      data-test="button-all"
      checked={watchedUnwatchedFilter === 'all'}
      onClick={() => setWatchedUnwatchedFilter('all')}
      /> All Movies

      <input type="radio"
      value="watched"
      name="watched"
      data-test="button-watched"
      checked={watchedUnwatchedFilter === 'watched'}
      onClick={() => setWatchedUnwatchedFilter('watched')}
      />Watched

      <input type="radio"
      value="unwatched"
      name="unwatched"
      data-test="button-unwatched"
      checked={watchedUnwatchedFilter === 'unwatched'}
      onClick={() => setWatchedUnwatchedFilter('unwatched')}
      /> To Watch
    </div>
  )
}

export default WatchedUnwatchedToggle;
