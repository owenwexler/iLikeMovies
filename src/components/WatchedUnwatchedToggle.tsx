import React from 'react';

import { useAtom } from 'jotai';

import {
  watchedUnwatchedFilterAtom
} from '../store/jotaiStore';

const WatchedUnwatchedToggle = () => {
  const [watchedUnwatchedFilter, setWatchedUnwatchedFilter] = useAtom(watchedUnwatchedFilterAtom);

  return (
    <div className="flex flex-row justify-center items-center space-x-6 text-white text-lg" data-test="watched-unwatched-component">

      <div className="flex flex-row space-x-2">
        <input type="radio"
          value="all"
          name="all"
          data-test="button-all"
          checked={watchedUnwatchedFilter === 'all'}
          onClick={() => setWatchedUnwatchedFilter('all')}
        />
        <p className="text-xl">
          All Movies
        </p>
      </div>

      <div className="flex flex-row space-x-2">
        <input type="radio"
          value="all"
          name="all"
          data-test="button-watched"
          checked={watchedUnwatchedFilter === 'watched'}
          onClick={() => setWatchedUnwatchedFilter('watched')}
        />
        <p className="text-xl">
          Watched
        </p>
      </div>

      <div className="flex flex-row space-x-2">
        <input type="radio"
          value="all"
          name="all"
          data-test="button-unwatched"
          checked={watchedUnwatchedFilter === 'unwatched'}
          onClick={() => setWatchedUnwatchedFilter('unwatched')}
        />
        <p className="text-xl">
          To Watch
        </p>
      </div>
    </div>
  )
}

export default WatchedUnwatchedToggle;
