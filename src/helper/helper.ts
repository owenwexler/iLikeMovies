/**
 * @function filterMovies
 * @param {Array} movies // array of objects -  shape must mimic that delivered from the API, otherwise function breaks
 * @param {String} movieFilter // options - 'all', 'watched', 'unwatched'
 * @returns {Array} array of objects - movies, filtered according to the movieFilter passed in
*/

import { Movie } from "../interfaces/Movie";

// I think this may be some of the only code from the original 2020 project that stays :sweat_smile:

export const filterMovies = (movies: Movie[], movieFilter: 'all' | 'watched' | 'unwatched'='all') => {
  if (movieFilter === 'all') {
    return movies;
  } else if (movieFilter === 'watched') {
    return movies.filter(movie => movie.watched === true);
  } else if (movieFilter === 'unwatched') {
    return movies.filter(movie => movie.watched === false);
  }
}
