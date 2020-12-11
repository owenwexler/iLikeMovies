import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { shallow, mount } from 'enzyme';
import { findByTestAttr, storeFactory } from '../../../test/testUtils';
import sampleData from '../../../data/sampleData.js';
import MovieList from './MovieList.jsx';
import rootReducer from '../reducers/rootReducer.js';

const setup = (inputMovies=[], inputWatchedUnwatched='all') => {
  return shallow(<MovieList movies={inputMovies} watchedUnwatchedFilter={inputWatchedUnwatched} />);
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
    wrapper = setup(sampleData, 'all');
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

describe('if watched is checked but no movies are watched', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(sampleData, 'watched');
  });

  test ('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-movie-list');
    expect(component.length).toBe(1);
  });

  test('no watched movies alert is shown', () => {
    const noWatchedAlert = findByTestAttr(wrapper, 'no-watched-alert');
    expect(noWatchedAlert.length).toBe(1);
  })

  test('correct number of movies', () => {
    const movieNodes = findByTestAttr(wrapper, 'movie-list-entry');
    expect(movieNodes.length).toBe(sampleData.length);
  });
});

describe('if watched is checked and one movie is watched', () => {
  test('correct number of movies', () => {
    let oneMovieWatched = sampleData.slice();
    oneMovieWatched[0].watched = true;
    let wrapper = setup(oneMovieWatched, 'watched');
    const movieNodes = findByTestAttr(wrapper, 'movie-list-entry');
    expect(movieNodes.length).toBe(1);
  });
});

describe('if unwatched is checked and one movie is unwatched', () => {
  test('correct number of movies', () => {
    let oneMovieUnwatched = sampleData.slice();
    oneMovieUnwatched.forEach(movie => movie.watched = true);
    oneMovieUnwatched[3].watched = false;
    let wrapper = setup(oneMovieUnwatched, 'unwatched');
    const movieNodes = findByTestAttr(wrapper, 'movie-list-entry');
    expect(movieNodes.length).toBe(1);
  });
});