import type { UserMovie } from "../../src/typedefs/UserMovie";

const earth: UserMovie = {
  title: 'Earth',
  year: '2007',
  rated: 'G',
  released: '22 Apr 2009',
  runtime: '90 min',
  genre: 'Documentary',
  director: 'Alastair Fothergill, Mark Linfield',
  writer: 'Alastair Fothergill, Mark Linfield, Leslie Megahey',
  actors: 'James Earl Jones, Patrick Stewart, Anggun',
  plot: 'Feature-length version of the documentary TV series Planet Earth (2006), following the migration paths of four animal families.',
  language: 'English',
  country: 'United Kingdom, Germany, United States, France',
  awards: 'Nominated for 1 BAFTA Award5 wins & 1 nomination total',
  poster: 'https://m.media-amazon.com/images/M/MV5BZDlkODRjYmItM2Y4Mi00NGY1LTgyODUtZmMxOWI5NWQ1NmFmXkEyXkFqcGc@._V1_SX300.jpg',
  ratings: [
    { source: 'Internet Movie Database', value: '7.9/10' },
    { source: 'Rotten Tomatoes', value: '87%' },
    { source: 'Metacritic', value: '72/100' }
  ],
  metascore: '72',
  imdbRating: '7.9',
  imdbVotes: '14,780',
  imdbID: 'tt0393597',
  type: 'movie',
  dvd: 'N/A',
  boxOffice: '$32,011,576',
  production: 'N/A',
  website: 'N/A',
  response: true,
  watched: false,
  userMovieId: '01JNSG260DWN0DQFFW8P219GW6'
};

export {
  earth
}
