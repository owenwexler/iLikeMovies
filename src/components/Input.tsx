import { useState, ChangeEvent, MouseEvent } from 'react';

import { postMovieToAPI } from '../helper/apiCalls';
import { Movie } from '../interfaces/Movie';

import {
  movieAtom,
  watchedUnwatchedFilterAtom
} from '../store/jotaiStore';

import { useAtom } from 'jotai';

const Input = () => {
  const [movies, setMovies] = useAtom(movieAtom);

  const [currentText, setCurrentText] = useState<string>('');

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async (e: MouseEvent) => {
    e.preventDefault();

    if (currentText === '') {
      console.log('Please enter in a movie');
      setError('blank-input');
      setTimeout(() => {
        setError(null);
      }, 1500)
      return;
    }

    const typedPostResponse =

    // post API call here
    setCurrentText('');
  }

  /**
   * @function handleTextChange
   * sets the currentText local state on change
   * @param {e} event - event from the DOM element
   * @returns none
   */
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentText(e.target.value);
  }

  return (
    <div data-test="component-input">
      <input data-test="input-box" type="text" value={currentText} onChange={handleTextChange} />
      <button data-test="submit-button" onClick={handleClick}>Add Movie</button>
      {
        error
        ?
        <p>{error === 'blank-input' ? 'Please enter a movie' : 'Error posting movie'}</p>
        :
        null
      }
      {
        success
        ?
        <p>Movie posted successfully</p>
        :
        null
      }
    </div>
  )
}

export default Input;
