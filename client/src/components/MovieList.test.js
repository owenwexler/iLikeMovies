import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { shallow, mount } from 'enzyme';
import { findByTestAttr, storeFactory } from '../../../test/testUtils';
import sampleData from '../../../data/sampleData.js';
import MovieList from './MovieList.jsx';
import rootReducer from '../reducers/rootReducer.js';

const setup = (inputMovies=[]) => {
  return shallow(<MovieList movies={inputMovies} />);
};

describe('if no movies are in the database', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-movie-list');
    expect(component.length).toBe(1);
  });

  test('renders instructions to enter a movie', () => {
    const instructions = findByTestAttr(wrapper, 'movie-instructions');
    expect(instructions.text().length).not.toBe(0);
  });
})

describe('if there are movies', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(sampleData);
  });

  test ('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-movie-list');
    expect(component.length).toBe(1);
  });

  test('correct number of movies', () => {
    const movieNodes = findByTestAttr(wrapper, 'movie-list-entry');
    expect(movieNodes.length).toBe(sampleData.length);
  });
});
