import moxios from 'moxios';

import { storeFactory } from '../../../test/testUtils';
import { getMovies } from './movieActions';
import sampleData from '../../../data/sampledata.js';

describe('getMovies action creator', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test('adds movie info from API to state', () => {
    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: sampleData,
      });
    });

    return store.dispatch(getMovies())
      .then(() => {
        const newState = store.getState();
        expect(newState.movies).toEqual(sampleData);
      });
  });
});