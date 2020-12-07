import React from 'react';
import movieContext from '../../contexts/movieContext';

const Input = () => {
  const [movies, setMovies] = movieContext.useMovies();
  const [currentMovie, setCurrentMovie] = React.useState('');

  const postMovie = (movie) => {
    console.log(`posting ${movie}`);
  }

  const handleClick = (e) => {
    postMovie(currentMovie);
    setCurrentMovie('');
    e.preventDefault();
  }

  const handleTextChange = (e) => {
    setCurrentMovie(e.target.value);
  }

  return (
    <div data-test="component-input">
      <input data-test="input-box" type="text" value={currentMovie} onChange={handleTextChange} />
      <button data-test="submit-button" onClick={handleClick} />
    </div>
  )
}

export default Input;
