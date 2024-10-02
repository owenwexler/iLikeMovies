import { movieNotFound } from './movieNotFound';

 const expectedTestResult = {
  title: 'Lean on Me',
  year: '1989',
  rated: 'PG-13',
  released: '03 Mar 1989',
  runtime: '108 min',
  genre: 'Drama',
  director: 'John G. Avildsen',
  writer: 'Michael Schiffer',
  actors: 'Morgan Freeman, Beverly Todd, Robert Guillaume',
  plot: 'The dedicated but tyrannical Joe Clark is appointed the principal of a decaying inner-city school he is determined to improve by any and all means.',
  language: 'English, Spanish, Portuguese',
  country: 'United States',
  awards: '4 wins & 5 nominations',
  poster: 'https://m.media-amazon.com/images/M/MV5BMTUxNjg3MzExOF5BMl5BanBnXkFtZTgwMDc1NjQyMTI@._V1_SX300.jpg',
  ratings: [
    {
      source: 'Internet Movie Database',
      value: '7.4/10'
    },
    {
      source: 'Rotten Tomatoes',
      value: '68%'
    },
    {
      source: 'Metacritic',
      value: '58/100'
    }
  ],
  metascore: '58',
  imdbRating: '7.4',
  imdbVotes: '21,631',
  imdbID: 'tt0097722',
  type: 'movie',
  dvd: '20 Oct 1998',
  boxOffice: '$31,906,454',
  production: 'N/A',
  website: 'N/A',
  response: 'True',
  watched: false
};

const expectedNotFoundTestResult = {
  ...movieNotFound,
  title: 'This Movie Does Not Exist'
}

const testSampleDataKey = 'lean on me';

const testTitle = 'Lean On Me';

export {
  expectedTestResult,
  expectedNotFoundTestResult,
  testSampleDataKey,
  testTitle
}