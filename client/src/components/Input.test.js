import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { shallow, mount } from 'enzyme';
import { findByTestAttr } from '../../../test/testUtils';

import rootReducer from '../reducers/rootReducer.js';

import moxios from 'moxios';
import Input from './Input.jsx';

import sampleData from '../../../data/sampledata.js';

/**
* Create ReactWrapper for Input component for testing
* @param {object} testValues - Context and props values for this specific test.
* @returns {ReactWrapper} - Wrapper for Input component and providers
*/
const setup = (movies=[]) => {
  const mockStore = createStore(rootReducer, {movies: movies});
  return mount(
    <Provider store={mockStore}>
      <Input />
    </Provider>
  );
}

test('Input renders without error', () => {
  const wrapper = setup([]);
  const inputComponent = findByTestAttr(wrapper, 'component-input');
  expect(inputComponent.length).toBe(1);
});

describe('state controlled input field', () => {
  let mockSetCurrentMovie = jest.fn();
  let wrapper;

  beforeEach(() => {
    mockSetCurrentMovie.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurrentMovie]);
    wrapper = setup([]);
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
});

describe('submit button updating movie in store', () => {
  let mockSetCurrentMovie = jest.fn();
  let wrapper;

  beforeEach(() => {
    mockSetCurrentMovie.mockClear();
    moxios.install();
    React.useState = jest.fn(() => ["", mockSetCurrentMovie]);
    wrapper = setup(sampleData.slice(0, 2));
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('movie is posted to store upon submit button click', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    const mockEvent = { target: { value: 'PCU' } };

    submitButton.simulate('click', mockEvent);

    const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: sampleData[3]
      });

    const newState = store.getState();
    expect(newState.movies).toEqual(sampleData);
  })
});