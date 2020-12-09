import React from 'react';

const Input = () => {
  const [movies, setMovies] = React.useState('')
  const [currentMovie, setCurrentMovie] = React.useState('');

  const postMovie = (movie) => {
    console.log(`posting ${movie}`);
  }

  const handleClick = (e) => {
    postMovie(currentMovie);
    setCurrentMovie('');
    e.preventDefault();
  }

  /**
   * @function handleTextChange
   * sets the currentMovie local state on change
   * @param {e} event - event from the DOM element
   * @returns none
   */
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
