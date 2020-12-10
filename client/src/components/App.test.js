import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { findByTestAttr, storeFactory } from '../../../test/testUtils';
import rootReducer from '../reducers/rootReducer.js';
import sampleData from '../../../data/sampledata.js';
import App from './App';

const setup = () => {
  let mockStore = storeFactory({movies: sampleData, watchedUnwatchedFilter: 'all'});
  return mount(
    <Provider store={mockStore}>
      <App />
    </Provider>
  )
}

test('App renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-app');
  expect(component.length).toBe(1);
});
