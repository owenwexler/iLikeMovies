import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { shallow, mount } from 'enzyme';
import { findByTestAttr, storeFactory } from '../../../test/testUtils';
import { postMovie } from '../actions/movieActions.js';
import rootReducer from '../reducers/rootReducer.js';
import Input from './Input.jsx';
import sampleData from '../../../data/sampledata.js';

/**
* Create ReactWrapper for Input component for testing
* @param {object} testValues - Context and props values for this specific test.
* @returns {ReactWrapper} - Wrapper for Input component and providers
*/

let mockStore = storeFactory({movies: sampleData.slice(0, 3), watchedUnwatchedFilter: 'all'});
let origDispatch = mockStore.dispatch;
mockStore.dispatch = jest.fn(origDispatch);

const setup = () => {
  return mount(
    <Provider store={mockStore}>
      <Input />
    </Provider>
  );
}

test('Input renders without error', () => {
  const wrapper = setup();
  const inputComponent = findByTestAttr(wrapper, 'component-input');
  expect(inputComponent.length).toBe(1);
});

describe('state controlled input field', () => {
  let mockSetCurrentMovie = jest.fn();
  let wrapper;

  beforeEach(() => {
    mockSetCurrentMovie.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurrentMovie]);
    wrapper = setup();
  });

  test('state updates with value of input box upon change', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');

    const mockEvent = { target: { value: 'movie' } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentMovie).toHaveBeenCalledWith('movie');
  });

});

describe('submit button', () => {
  let mockSetCurrentMovie = jest.fn();
  let wrapper;

  test('postMovie dispatch is called and currentMovie field is cleared on click', () => {
    React.useState = jest.fn(() => ['PCU', mockSetCurrentMovie]);
    wrapper = setup();

    const submitButton = findByTestAttr(wrapper, 'submit-button');

    submitButton.simulate('click');

    expect(mockStore.dispatch).toHaveBeenCalled();
    expect(mockSetCurrentMovie).toHaveBeenCalledWith('');
  });
});