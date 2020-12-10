import React from 'react';
import Input from './Input.jsx';
import MovieList from './MovieList.jsx';
import { useSelector, useDispatch } from "react-redux";
import { getMovies } from '../actions/movieActions.js';
import { filterMovies } from '../helper/helper.js';

const App = () => {
  let filteredMovies;
  const movies = useSelector(state => state.movies);
  const watchedUnwatchedFilter = useSelector(state => state.watchedUnwatchedFilter);
  const dispatch = useDispatch();

  filteredMovies = filterMovies(movies, watchedUnwatchedFilter).reverse();

  React.useEffect(() => {
    dispatch(getMovies());
  }, [])

  return (
    <div data-test="component-app">
      <h1>iLikeMovies</h1>

      <Input />
      <MovieList movies={filteredMovies}/>

    </div>
  )
}

export default App;