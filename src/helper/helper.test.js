import sampleData from '../../../data/sampledata.js';
import { filterMovies } from './helper.js';

let movies = sampleData.slice();
movies[0].watched = true;
movies[1].watched = true;

describe('filterMovies function', () => {
  it('should return all movies when passed an `all` filter', () => {
    let filteredMovies = filterMovies(movies, 'all');
    expect(filteredMovies).toEqual(sampleData);
  });

  it('should return only watched movies when passed a `watched` filter', () => {
    let filteredMovies = filterMovies(movies, 'watched');
    expect(filteredMovies).toEqual(sampleData.slice(0, 2));
  });

  it('should return only unwatched movies when passed a `unwatched` filter', () => {
    let filteredMovies = filterMovies(movies, 'unwatched');
    expect(filteredMovies).toEqual(sampleData.slice(2));
  });
});