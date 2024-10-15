import type { APIRoute } from 'astro';
import { getOMDBMovie } from '../../../../../omdb/omdb';
import type { UserMovie } from '../../../../db/schema';

export const GET: APIRoute = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const idParam = searchParams.get('id');
  const id = idParam ? idParam as string : '';
  
  const env = import.meta.env;
  const omdbAPIKey = env.OMDB_API_KEY;
  const nodeEnv = env.NODE_ENV ? env.NODE_ENV : 'development';
  const devMode = nodeEnv === "development" && env.DEV_MODE === 'offline' ? 'offline' : 'online';

  try {
    const userMovieResponse: UserMovie = await getUserMoviesById({ inputUserId: id });

    const promises = [];

    for (const userMovie of userMovieResponse) {
      promises.push(getOMDBMovie({ movieTitle: userMovie.title, apiKey: omdbAPIKey, devMode: devMode, method: 'title' }));
      /*
       * TODO: add IMDB IDs for each movie to omdbOffline and uncomment this code when this is done
      if (userMovie.imdbId !== null) {
        promises.push(getOMDBMovie({ movieTitle: userMovie.title, apiKey: omdbAPIKey, devMode: devMode, method: 'imdbID' }));
      } else {
        promises.push(getOMDBMovie({ movieTitle: userMovie.title, apiKey: omdbAPIKey, devMode: devMode, method: 'title' }));
      }
      */
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}; 
