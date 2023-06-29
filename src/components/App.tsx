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
        <br />
        <br />
        <main className="bg-gray-900 max-w-full max-h-full">
          <div className="flex flex-row items-center justify-center text-center py-6 bg-gray-900 text-white align-center mt-4">
            <h3 className="text-2xl">Looking at {watchedUnwatchedFilter} movies</h3>
          </div>
          <div className="bg-gray-900 text-white" data-test="component-app">
            <MovieList movies={movies} watchedUnwatchedFilter={watchedUnwatchedFilter} />
          </div>
        </main>
    </>
  )
}

export default App;