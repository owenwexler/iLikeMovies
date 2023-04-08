/**
 * @function filterMovies
 * @param {Array} movies // array of objects -  shape must mimic that delivered from the API, otherwise function breaks
 * @param {String} movieFilter // options - 'all', 'watched', 'unwatched'
 * @returns {Array} array of objects - movies, filtered according to the movieFilter passed in
 */

// I think this may be the only code from the original 2020 project that stays :sweat_smile:

export const filterMovies = (movies, movieFilter='all') => {
  if (movieFilter === 'all') {
    return movies;
  } else if (movieFilter === 'watched') {
    return movies.filter(movie => movie.watched === true);
  } else if (movieFilter === 'unwatched') {
    return movies.filter(movie => movie.watched === false);
  }
}
