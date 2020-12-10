/**
 * @function filterMovies -
 * @param {Array of objects} movies // shape must mimic that delivered from the API, otherwise function breaks
 * @param {String} movieFilter // options - 'all', 'watched', 'unwatched'
 * @returns {Array of objects} movies, filtered according to the movieFilter passed in
 */
export const filterMovies = (movies, movieFilter='all') => {
  if (movieFilter === 'all') {
    return movies.slice();
  } else if (movieFilter === 'watched') {
    return movies.slice().filter(movie => movie.watched === true);
  } else if (movieFilter === 'unwatched') {
    return movies.slice().filter(movie => movie.watched === false);
  }
}
