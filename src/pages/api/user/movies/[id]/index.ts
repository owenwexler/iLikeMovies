import type { APIRoute } from 'astro';
import { getUserMoviesById } from '../../../../../db/models/userMovies';
import type { UserMovie } from '../../../../../db/schema';
import { getOMDBMovie } from '../../../../../../omdb/omdb';
import { formatArrayAsCacheObject } from '../../../../../helper/formatArrayAsCacheObject';

export const GET: APIRoute = async ({ params, request }) => {
  const { id } = params;
  
  const env = import.meta.env;
  const omdbAPIKey = env.OMDB_API_KEY;
  const nodeEnv = env.NODE_ENV ? env.NODE_ENV : 'development';
  const devMode = nodeEnv === "development" && env.DEV_MODE === 'offline' ? 'offline' : 'online';

  try {
    const userMovieResponse: UserMovie[] = await getUserMoviesById({ inputUserId: id });

    const promises = [];

    for (const userMovie of userMovieResponse) {
      if (userMovie.imdbId !== null) {
        promises.push(getOMDBMovie({ movieTitle: userMovie.title, imdbId: userMovie.imdbId, apiKey: omdbAPIKey, devMode: devMode, method: 'imdbID' }));
      } else {
        promises.push(getOMDBMovie({ movieTitle: userMovie.title, apiKey: omdbAPIKey, devMode: devMode, method: 'title' }));
      }
    }

    const data = await Promise.all(promises);


    console.log(data);
    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error(error);
    return { error }
  }
}; 
