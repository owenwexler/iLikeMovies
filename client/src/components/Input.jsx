import React from 'react';
import axios from 'axios';
import { postMovie } from '../actions/movieActions.js';
import { useDispatch } from 'react-redux';

const Input = () => {
  const [currentMovie, setCurrentMovie] = React.useState('');
  const dispatch = useDispatch();

  const handleClick = (e) => {
    if (currentMovie === '') {
      console.log('Please enter in a movie');
      return;
    }

    dispatch(postMovie(currentMovie));
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
      <button data-test="submit-button" onClick={handleClick}>Add Movie</button>
    </div>
  )
}

export default Input;
