const app = require('./app.js');
// const dotenv = require('dotenv');
// dotenv.config();
const PORT = 3000;
app.listen(PORT, () => console.log('iLikeMovies server listening on ', PORT));