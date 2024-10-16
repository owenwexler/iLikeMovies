import type { APIRoute } from 'astro';
import { getUserMoviesById } from '../../../../../db/models/userMovies';
import type { UserMovie } from '../../../../../db/schema';
import { getOMDBMovie } from '../../../../../../omdb/omdb';

export const GET: APIRoute = async ({ params, request }) => {
  const { id } = params;
  
  console.log('id: ', id);

  const env = import.meta.env;
  const omdbAPIKey = env.OMDB_API_KEY;
  const nodeEnv = env.NODE_ENV ? env.NODE_ENV : 'development';
  const devMode = nodeEnv === "development" && env.DEV_MODE === 'offline' ? 'offline' : 'online';

  try {
    const userMovieResponse: UserMovie = await getUserMoviesById({ inputUserId: id });

    console.log('userMovieResponse: ', userMovieResponse);

    const promises = [];

    for (const userMovie of userMovieResponse) {
      // TODO: figure out why titles not in OMDB aren't going through
      promises.push(getOMDBMovie({ movieTitle: userMovie.movieName.toLowerCase(), apiKey: omdbAPIKey, devMode: devMode, method: 'title' }));
      /*
       * TODO: add IMDB IDs for each movie to omdbOffline and uncomment this code when this is done
      if (userMovie.imdbId !== null) {
        promises.push(getOMDBMovie({ movieTitle: userMovie.title, apiKey: omdbAPIKey, devMode: devMode, method: 'imdbID' }));
      } else {
        promises.push(getOMDBMovie({ movieTitle: userMovie.title, apiKey: omdbAPIKey, devMode: devMode, method: 'title' }));
      }
      */
    }

    const data = await Promise.all(promises);
    console.log('promises from api route: ', promises)

    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error(error);
    throw error;
  }
}; 
