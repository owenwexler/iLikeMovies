import { Hono } from 'hono';
import { deleteTestUser } from '../db/models/user';
import { getOMDBEnvVariables } from '../helper/getOMDBEnvVariables';
import { addUserMovie, getSingleUserMovieById, getUserMoviesById, setMovieWatched } from '../db/models/userMovies';
import { getOMDBMovie } from '../../omdb/omdb';
import { getTypedFilter } from '../helper/getTypedFilter';
import { ulid } from 'ulid';

const apiRoute = new Hono();
 
// these variables are used by all API routes so let's make them global
const { omdbAPIKey, nodeEnv, devMode, hostUrl } = getOMDBEnvVariables(Bun.env as Env);

apiRoute.get('/', (c) => {
  return c.json({ error: 'API route must be specified' });
});

apiRoute.get('/movie/title/', async (c) => {
  const searchParams = c.req.query();
  const titleParam = searchParams.get('title');
  const title = titleParam ? (titleParam as string) : '';

  try {
    const data = await getOMDBMovie({
      movieTitle: title,
      apiKey: omdbAPIKey,
      devMode: devMode,
      method: 'title'
    });

    return c.json({ data });
  } catch (err) {
    console.error(err);
    throw error;
  }
});

export default apiRoute;
