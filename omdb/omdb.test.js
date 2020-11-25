const getOMDBMovie = require('./omdb.js');

it('gets the title of a known movie successfully', () => {
  getOMDBMovie('Lean On Me', (err, result) => {
    if(err) {
      expect(result).toBeNull();
    } else {
      expect(result.Title).toBe('Lean On Me');
    }
  })
})

it('returns a false response for an unknown movie', () => {
  getOMDBMovie('THISMOVIEDOESNOTEXIST', (err, result) => {
    if (err) {
      expect(result).toBeNull();
    } else {
      expect(result.Response).toBe('False');
    }
  })
})
