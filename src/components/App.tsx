import React, { useEffect, useState } from 'react';
import Input from './Input';
import WatchedUnWatchedToggle from './WatchedUnwatchedToggle';
import MovieList from './MovieList';

import type { Movie } from '../interfaces/Movie';

import { getMoviesFromAPI } from '../helper/apiCalls.js';

import {
  movieAtom,
  watchedUnwatchedFilterAtom
} from '../store/jotaiStore';

import { useAtom } from 'jotai';
import Navbar from './Navbar';

const App = () => {
  let filteredMovies;
  const [movies, setMovies] = useAtom(movieAtom);
  const [watchedUnwatchedFilter, setWatchedUnwatchedFilter] = useAtom(watchedUnwatchedFilterAtom);

  const [error, setError] = useState(false);

  useEffect(() => {
    getMoviesFromAPI()
      .then((data) => {
        const unknownData = data as unknown;
        const typedData = unknownData as Movie[]
        setMovies(typedData);
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <Navbar />
      <div className="bg-gray-800 text-white mt-6" data-test="component-app">

        <h3>Looking at {watchedUnwatchedFilter} movies</h3>

        <MovieList movies={movies} watchedUnwatchedFilter={watchedUnwatchedFilter} />

      </div>
    </>
  )
}

export default App;