const OMDB_API_KEY = require('../cfg/omdb.config.js');
const axios = require('axios');

const getOMDBMovie = async (movie, callback) => {
  try {
    const result = await axios(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${movie}&r=json&plot=short`);
    const data = result.data
    callback(null, data);
  } catch (error) {
    callback(error, null);
  }
}

getOMDBMovie('Lean On Me', (err, res) => {
  console.log(JSON.stringify(res));
})

module.exports = getOMDBMovie;