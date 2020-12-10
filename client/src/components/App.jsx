import React from 'react';
import Input from './Input.jsx';
import MovieList from './MovieList.jsx';
import { getMovies } from '../actions/movieActions.js';
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const movies = useSelector(state => state.movies);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getMovies());
  }, [])

  return (
    <div data-test="component-app">
      <h1>iLikeMovies</h1>

      <Input />
      <MovieList movies={movies}/>

    </div>
  )
}

export default App;