import moxios from 'moxios';

import { storeFactory } from '../../../test/testUtils';
import { getMovies, postMovie, toggleMovieWatched } from './movieActions';
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

describe('postMovie action creator', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('posts movie to state successfully', () => {
    const store = storeFactory({movies: sampleData.slice(0, 3), watchedUnwatchedFilter: 'all'});

    const firstState = store.getState();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: sampleData[3],
      });
    });

    return store.dispatch(postMovie('PCU'))
      .then(() => {
        const newState = store.getState();
        expect(newState.movies).toEqual(sampleData);
      });
  });
});

describe('toggleMovieWatched action creator', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('action succesfully updates watchedUnwatchedFilter for a valid movie ID', () => {
    const store = storeFactory({movies: sampleData, watchedUnwatchedFilter: 'all'});

    let putData = sampleData.slice();
    putData[0].watchedUnwatchedFilter = true;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: putData,
      });
    });

    return store.dispatch(toggleMovieWatched(1))
      .then(() => {
        const newState = store.getState();
        expect(newState.movies).toEqual(putData);
      });
  });
});