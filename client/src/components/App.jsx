import React from 'react';
import Input from './Input.jsx';
import WatchedUnWatchedToggle from './WatchedUnWatchedToggle.jsx';
import MovieList from './MovieList.jsx';
import { useSelector, useDispatch } from "react-redux";
import { getMovies } from '../actions/movieActions.js';


const App = () => {
  let filteredMovies;
  const movies = useSelector(state => state.movies);
  const watchedUnwatchedFilter = useSelector(state => state.watchedUnwatchedFilter);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getMovies());
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