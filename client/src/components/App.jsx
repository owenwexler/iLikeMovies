import React from 'react';
import Input from './Input.jsx';
import MovieList from './MovieList.jsx';

const App = () => {
  return (
    <div data-test="component-app">
      <h1>iLikeMovies</h1>
      <Input />
    </div>
  )
}

export default App;