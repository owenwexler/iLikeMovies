import React from 'react';
import { shallow, mount } from 'enzyme';
import { findByTestAttr } from '../../../test/testUtils';
import sampleData from '../../../data/sampleData.js';

const setup = (movies=[]) => {
  const mockUseMovies = jest.fn().mockReturnValue([movies, jest.fn()]);
  movieContext.useMovies = mockUseMovies;
  return shallow(<MovieList />)
};

describe('if no movies are in the database', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup([]);
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
    const movieNodes = findByTestAttr(wrapper, 'movie-list-item');
    expect(movieNodes.length).toBe(sampleData.length);
  });
});
