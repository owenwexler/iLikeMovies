import React, { useEffect, useState } from 'react';
import Input from './Input';
import WatchedUnWatchedToggle from './WatchedUnwatchedToggle';
import MovieList from './MovieList';

import type { IMovie } from '../interfaces/IMovie';

import { getMoviesFromAPI } from '../helper/apiCalls.js';

import {
  movieAtom,
  watchedUnwatchedFilterAtom
} from '../store/jotaiStore';

import { useAtom } from 'jotai';

const App = () => {
  let filteredMovies;
  const [movies, setMovies] = useAtom(movieAtom);
  const [watchedUnwatchedFilter, setWatchedUnwatchedFilter] = useAtom(watchedUnwatchedFilterAtom);

  const [error, setError] = useState(false);

  useEffect(() => {
    getMoviesFromAPI()
      .then((data) => {
        const unknownData = data as unknown;
        const typedData = unknownData as IMovie[]
        setMovies(typedData);
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div data-test="component-app">
      <h1>iLikeMovies</h1>
      <h3>Looking at {watchedUnwatchedFilter} movies</h3>

      <WatchedUnWatchedToggle />
      <Input />
      <MovieList movies={movies} watchedUnwatchedFilter={watchedUnwatchedFilter} />

    </div>
  )
}

export default App;