const express = require('express');
const app = express();
const path = require('path');
// const cors = require('cors');

app.use(express.json());
// app.use(cors());

const staticPath = __dirname + '/../client/dist/';
app.use(express.static(staticPath));

// ROUTES

// app.get('/api/movies', (req, res) => {
//   res.status(200).send()
// })

// app.get('/', (req, res) => {
//   res.status(200).send('Hello World!');
// })

// app.get('*', (req, res) => {
//   res.sendFile('index.html', { root: './client/dist/' });
// });

module.exports = app;