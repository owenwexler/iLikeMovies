const getOMDBMovie = require('./omdb.js');

it('gets the title of a known movie successfully', () => {
  getOMDBMovie('Lean On Me', (err, result) => {
    expect(result.Search[0].title.toBe('Lean On Me'));
  })
})

it('returns a false response for an unknown movie', () => {
  getOMDBMovie('THISMOVIEDOESNOTEXIST', (err, result) => {
    expect(result.Response.toBe('False'));
  })
})
