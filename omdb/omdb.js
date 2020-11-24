const OMDB_API_KEY = require('../cfg/omdb.config.js');
const axios = require('axios');

const getOMDBMovie = async (movie, callback) => {
  try {
    const result = await axios(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${movie}&type=movie&r=json`);
    const data = result.data
    callback(null, data);
  } catch (error) {
    callback(error, null);
  }
}

module.exports = getOMDBMovie;