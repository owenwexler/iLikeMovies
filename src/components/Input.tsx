import React, { ChangeEvent, MouseEvent } from 'react';

import axios from 'axios';

const Input = () => {
  const [currentMovie, setCurrentMovie] = React.useState('');

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();

    if (currentMovie === '') {
      console.log('Please enter in a movie');
      return;
    }

    // post API call here
    setCurrentMovie('');
  }

  /**
   * @function handleTextChange
   * sets the currentMovie local state on change
   * @param {e} event - event from the DOM element
   * @returns none
   */
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentMovie(e.target.value);
  }

  return (
    <div data-test="component-input">
      <input data-test="input-box" type="text" value={currentMovie} onChange={handleTextChange} />
      <button data-test="submit-button" onClick={handleClick}>Add Movie</button>
    </div>
  )
}

export default Input;
