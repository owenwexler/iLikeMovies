const express = require('express');
const app = express();
const path = require('path');
// const cors = require('cors');

const sampleData = require('../data/sampledata.js');
const getOMDBMovie = require('../omdb/omdb.js');

let movieData = sampleData.slice();

app.use(express.json());
// app.use(cors());

const staticPath = __dirname + '/../client/dist/';
app.use(express.static(staticPath));

// ROUTES

app.get('/api/movies', (req, res) => {
  res.status(200);
  res.json(movieData);
})

app.post('/api/movies', (req, res) => {
  let movieQueryTitle = req.query.movie;

  let existing = movieData.slice().filter(movie => movie.title.toLowerCase() === movieQueryTitle.toLowerCase());

  if (existing.length > 0) {
    res.json(existing[0]);
  } else {
    getOMDBMovie(movieQueryTitle, (err, data) => {
      let resultData;
      if (err) {
        res.status(500).send();
      } else {
        if (data.Response === 'False') {
          resultData = {
            movieListId: movieData.length + 1,
            title: movieQueryTitle,
            year: 0,
            rated: 'No info available',
            released: 'No info available',
            genre: 'No info available',
            runtime: 'N/A',
            director: 'No info available',
            writer: 'No info available',
            actors: 'No info available',
            plot: 'No plot available',
            poster: 'No poster available',
            metascore: 0,
            imdbRating: 0,
            production: 'No info available '
          };
        } else {
          resultData = {
            movieListId: movieData.length + 1,
            title: data.Title,
            year: Number(data.Year),
            rated: data.Rated,
            released: data.Released,
            genre: data.Genre,
            runtime: data.Runtime,
            director: data.Director,
            writer: data.Writer,
            actors: data.Actors,
            plot: data.Plot,
            poster: data.Poster,
            metascore: Number(data.Metascore),
            imdbRating: Number(data.imdbRating),
            production: data.Production
          };
        }

        movieData.push(resultData);
        res.json(resultData);
      }
    });
  }


})

module.exports = app;