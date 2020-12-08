const watchedUnwatchedFilterActionTypes = {
  SET_WATCHED: 'SET_WATCHED',
  SET_UNWATCHED: 'SET_UNWATCHED',
  SET_ALL: 'SET_ALL'
}

const setAll = () => {
  return { type: 'SET_ALL' };
}

const setWatched = () => {
  return { type: 'SET_WATCHED' };
}

const setUnwatched = () => {
  return { type: 'SET_UNWATCHED' };
}

export { watchedUnwatchedFilterActionTypes }