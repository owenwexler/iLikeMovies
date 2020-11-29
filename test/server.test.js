const app = require('../server/app.js');
const supertest = require('supertest');
const request = supertest(app);

const responseObjectAssertions = (obj) => {
  // expect(obj).toHaveProperty('movieListId');
  // expect(obj).toHaveProperty('title');
  // expect(obj).toHaveProperty('year');
  // expect(obj).toHaveProperty('rated');
  // expect(obj).toHaveProperty('released');
  // expect(obj).toHaveProperty('genre');
  // expect(obj).toHaveProperty('runtime');
  // expect(obj).toHaveProperty('director');
  // expect(obj).toHaveProperty('writer');
  // expect(obj).toHaveProperty('actors');
  // expect(obj).toHaveProperty('plot');
  // expect(obj).toHaveProperty('poster');
  // expect(obj).toHaveProperty('metascore');
  // expect(obj).toHaveProperty('imdbRating');

  expect(typeof obj.movieListId).toBe('number');
  expect(typeof obj.title).toBe('string');
  expect(typeof obj.year).toBe('number');
  expect(typeof obj.rated).toBe('string');
  expect(typeof obj.released).toBe('string');
  expect(typeof obj.genre).toBe('string');
  expect(typeof obj.runtime).toBe('string');
  expect(typeof obj.director).toBe('string');
  expect(typeof obj.writer).toBe('string');
  expect(typeof obj.actors).toBe('string');
  expect(typeof obj.plot).toBe('string');
  expect(typeof obj.poster).toBe('string');
  expect(typeof obj.metascore).toBe('number');
  expect(typeof obj.imdbRating).toBe('number');
  expect(typeof obj.production).toBe('string');
}

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

    responseObjectAssertions(obj);

    done();
  });
});

describe('POST route', () => {
  it('successfully posts a known movie using OMDB data', async done => {
    let getResponse = await request.get('/api/movies');

    let firstLength = getResponse.body.length;

    let postResponse = await request.post('/api/movies?movie=Patton');

    responseObjectAssertions(postResponse.body);

    getResponse = await request.get('/api/movies');
    expect(getResponse.body.length).toEqual(firstLength + 1);

    done();
  });

  it('successfully posts an unknown movie using dummy data', async done => {
    let getResponse = await request.get('/api/movies');

    let firstLength = getResponse.body.length;
    console.log('firstLength: ', firstLength);

    let postResponse = await request.post('/api/movies?movie=THISMOVIEDOESNOTEXIST');

    responseObjectAssertions(postResponse.body);

    getResponse = await request.get('/api/movies');
    expect(getResponse.body.length).toEqual(firstLength + 1);

    done();
  });

  it('refrains from posting a movie already in the database', async done => {
    let getResponse = await request.get('/api/movies');

    let firstLength = getResponse.body.length;

    let postResponse = await request.post('/api/movies?movie=Lean On Me');

    getResponse = await request.get('/api/movies');

    expect(getResponse.body.length).toEqual(firstLength);

    done();
  });
})
