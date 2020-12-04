import React from 'react';
import { mount } from 'enzyme';

import { findByTestAttr } from '../../../test/testUtils';
import Input from './Input.jsx';
import movieContext from '../../contexts/movieContext';
import sampleData from '../../../data/sampledata.js';

/**
* Create ReactWrapper for Input component for testing
* @param {object} testValues - Context and props values for this specific test.
* @returns {ReactWrapper} - Wrapper for Input component and providers
*/
const setup = ({ movies }) => {
  movies = sampleData;

  return mount(
    <movieContext.MovieProvider value={[movies, jest.fn()]} >
      <Input />
    </movieContext.MovieProvider>
  );
}

test('Input renders without error', () => {
  const wrapper = setup({});
  const inputComponent = findByTestAttr(wrapper, 'component-input');
  expect(inputComponent.length).toBe(1);
});

describe('state controlled input field', () => {
  let mockSetCurrentMovie = jest.fn();
  let wrapper;

  beforeEach(() => {
    mockSetCurrentMovie.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurrentMovie]);
    wrapper = setup({});
  });

  test('state updates with value of input box upon change', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');

    const mockEvent = { target: { value: 'movie' } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentMovie).toHaveBeenCalledWith('movie');
  });

  test('field is cleared upon submit button click', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button');

    submitButton.simulate('click', { preventDefault() {} });
    expect(mockSetCurrentMovie).toHaveBeenCalledWith('');
  })

  // test('movie is posted upon submit button click', () => {
  //   const submitButton = findByTestAttr(wrapper, 'submit-button');

  //   submitButton.simulate('click', { preventDefault() {} });
  //   expect(postMovie).toHaveBeenCalledWith('');
  // })
});