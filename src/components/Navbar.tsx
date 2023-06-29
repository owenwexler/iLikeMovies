import React, { useState } from 'react';
import RoundInput from './style/RoundInput';
import RoundButton from './style/RoundButton';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentInputText, setCurrentInputText] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 fixed w-full top-0 z-100 border border-gray-700 shadow-md">
      <div className="flex items-center justify-between px-2 py-3 sm:px-1 lg:px-1">
        <span className="text-white font-light text-3xl ml-6 max-sm:ml-1">iLikeMovies</span>
        <div className="flex justify-end items-end space-x-2 mr-6 max-sm:mr-1">
            <RoundInput
              inputId="add-movie-input"
              ariaLabel="enter movie to add"
              placeholder="Enter a movie..."
              width="1/2"
              currentValue={currentInputText}
              setCurrentValue={setCurrentInputText}
            />

            <RoundButton
              buttonId="movie-add"
              ariaLabel="add a movie"
              onClick={() => console.log('C L I C K E D')}
            >
              ADD
            </RoundButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;