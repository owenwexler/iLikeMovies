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
  res.json(sampleData);
})

app.post('api/movies', (req, res) => {
  const movieQueryTitle = req.query.movie;

  let existing = movieData.filter(movie => movie.title = movieQueryTitle);
  let resultData;

  if (existing.length > 0) {
    res.json(existing[0]);
  }

  getOMDBMovie(movieQueryTitle, (err, data) => {
    if (err) {
      res.status(500).send();
    } else {
      if (data.Response = 'False') {
        // resultData = getDummyData(title);
      } else {
        resultData = data;
      }

      movieData.push(resultData);
      res.json(resultData);
    }
  });


})

// app.get('*', (req, res) => {
//   res.sendFile('index.html', { root: './client/dist/' });
// });

module.exports = app;