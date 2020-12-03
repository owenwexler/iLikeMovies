import React from 'react';

/**
 * Provides the filter for watched and unwatched movies
 * Options:
 * 'all': all movies
 * 'watched': watched movies only
 * 'unwatched': unwatched/to watch movies only
 */

const watchedUnwatchedFilterContext = React.createContext();

const useWatchedUnwatchedFilter = () => {
  const context = React.useContext(watchedUnwatchedFilterContext);

  if (!context) {
    throw new Error('useWatchedUnwatchedFilter must be used within a MovieProvider')
  }

  return context;
}

const WatchedUnwatchedFilterProvider = (props) => {
  const [watchedUnwatchedFilter, setWatchedUnwatchedFilter] = useState('all');

  const value = React.useMemo(() => [watchedUnwatchedFilter, setWatchedUnwatchedFilter], [watchedUnwatchedFilter]);

  return <watchedUnwatchedFilterContext.Provider value={value} {...props} />
}

export default { WatchedUnwatchedFilterProvider, useWatchedUnwatchedFilter };
