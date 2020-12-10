import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { shallow, mount } from 'enzyme';
import { findByTestAttr, storeFactory } from '../../../test/testUtils';
import sampleData from '../../../data/sampleData.js';
import WatchedUnwatchedToggle from './WatchedUnwatchedToggle.jsx';
import rootReducer from '../reducers/rootReducer.js';

let mockStore = storeFactory({movies: sampleData, watchedUnwatchedFilter: 'all'});
let origDispatch = mockStore.dispatch;
mockStore.dispatch = jest.fn(origDispatch);

const setup = () => {
  return mount(
    <Provider store={mockStore}>
      <WatchedUnwatchedToggle />
    </Provider>
  );
}

describe('watchedUnwatchedToggle', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
    const allButton = findByTestAttr(wrapper, 'button-all');
    const watchedButton = findByTestAttr(wrapper, 'button-watched');
    const unwatchedButton = findByTestAttr(wrapper, 'button-unwatched');
  })

  test('component renders without error', () => {
    const watchedUnwatchedFilterComponent = findByTestAttr(wrapper, 'watched-unwatched-component');
    expect(watchedUnwatchedFilterComponent.length).toBe(1);
  });

  test('all three radio buttons are rendered', () => {
    const wrapper = setup();
    expect(allButton.length).toBe(1);
    expect(watchedButton.length).toBe(1);
    expect(unwatchedButton.length).toBe(1);
  });

  test('clicking watched button sets watchedUnwatchedFilter state to watched, () => {
    watchedButton.simulate('click');

    expect(mockStore.dispatch).toHaveBeenCalled();
    expect(mockStore.getState().watchedUnwatchedFilter).toBe('watched');
  });

  test('clicking unwatched button sets watchedUnwatchedFilter state to unwatched, () => {
    unwatchedButton.simulate('click');

    expect(mockStore.dispatch).toHaveBeenCalled();
    expect(mockStore.getState().watchedUnwatchedFilter).toBe('unwatched');
  });

  test('clicking all button sets watchedUnwatchedFilter state to all, () => {
    allButton.simulate('click');

    expect(mockStore.dispatch).toHaveBeenCalled();
    expect(mockStore.getState().watchedUnwatchedFilter).toBe('all');
  });

})