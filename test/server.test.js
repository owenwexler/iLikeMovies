const app = require('../server/app.js');
const supertest = require('supertest');
const request = supertest(app);

describe('GET route', () => {
  it('queries the /movies endpoint successfully', async done => {
    const response = await request.get('/api/movies');

    expect(response.status).toBe(200);
    done();
  });

  it('fetches data in the proper shape from the movies endpoint', async done => {
    const response = await request.get('/api/movies');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    const obj = response.body[0];
    expect(obj).toHaveProperty('movieListId');
    expect(obj).toHaveProperty('title');
    expect(obj).toHaveProperty('year');
    expect(obj).toHaveProperty('rated');
    expect(obj).toHaveProperty('released');
    expect(obj).toHaveProperty('genre');
    expect(obj).toHaveProperty('runtime');
    expect(obj).toHaveProperty('director');
    expect(obj).toHaveProperty('writer');
    expect(obj).toHaveProperty('actors');
    expect(obj).toHaveProperty('plot');
    expect(obj).toHaveProperty('poster');
    expect(obj).toHaveProperty('metascore');
    expect(obj).toHaveProperty('imdbRating');

    expect(typeof obj.movieListId).toBe('number');
    expect(typeof obj.title).toBe('string');
    expect(typeof obj.year).toBe('number');
    expect(typeof obj.rated).toBe('string');
    expect(typeof obj.released).toBe('string');
    expect(typeof obj.genre).toBe('string');
    expect(typeof obj.runtime).toBe('number');
    expect(typeof obj.director).toBe('string');
    expect(typeof obj.writer).toBe('string');
    expect(typeof obj.actors).toBe('string');
    expect(typeof obj.plot).toBe('string');
    expect(typeof obj.poster).toBe('string');
    expect(typeof obj.metascore).toBe('number');
    expect(typeof obj.imdbRating).toBe('number');
    expect(typeof obj.production).toBe('string');

    done();
  });
});
