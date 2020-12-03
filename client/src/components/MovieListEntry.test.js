import React from 'react';
import { shallow, mount } from 'enzyme';
import { findByTestAttr } from '../../../test/testUtils';
import sampleData from '../../../data/sampleData.js';
import MovieListEntry from './MovieListEntry.jsx';

const setup = (key, inputMovie={}) => {
  return shallow(<MovieListEntry key={key}data-test="movie-list-entry" movie={inputMovie} />);
};

const assertForTextItem = (wrapper, item) => {
  const result = findByTestAttr(wrapper, `movielistentry-${item}`);
  expect(result.text().length).not.toBe(0);
}

describe('MovieListEntry component', () => {
  let wrapper = setup(0, sampleData[0]);

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-movie-list-entry');
    expect(component.length).toBe(1);
  });

  test('renders an image', () => {
    const image = findByTestAttr(wrapper, 'movielistentry-image');
    expect(image.length).not.toBe(0);
  });

  test('renders a title', () => {
    assertForTextItem(wrapper, 'title');
  });

  test('renders a year', () => {
    assertForTextItem(wrapper, 'year');
  });

  test('renders a genre', () => {
    assertForTextItem(wrapper, 'genre');
  });

  test('renders actors', () => {
    assertForTextItem(wrapper, 'actors');
  });

  test('renders a toggle watch button', () => {
    const toggleWatch = findByTestAttr(wrapper, 'movielistentry-togglebutton');
    expect(toggleWatch.length).not.toBe(0);
  });
});

