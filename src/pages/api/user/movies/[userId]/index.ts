import type { APIRoute } from 'astro';
import { getUserMoviesById } from '../../../../../db/models/userMovies';
import type { UserMovie } from '../../../../../db/schema';
import { getOMDBMovie } from '../../../../../../omdb/omdb';
import { formatArrayAsCacheObject } from '../../../../../helper/formatArrayAsCacheObject';
import type { FilterUnionType } from '../../../../../typedefs/FilterUnionType';
import { getTypedFilter } from '../../../../../helper/getTypedFilter';
import { getOMDBEnvVariables } from '../../../../../helper/getOMDBEnvVariables';

export const GET: APIRoute = async ({ params, request }) => {
  const { userId } = params;
  
  const searchParams = request.url.slice(request.url.indexOf('?'));

  const filterParam = searchParams.slice(searchParams.indexOf('=') + 1);
  const filter: FilterUnionType = getTypedFilter(filterParam);

  const { omdbAPIKey, nodeEnv, devMode } = getOMDBEnvVariables(import.meta.env as Env);

  try {
    const userMovieResponse: UserMovie[] = await getUserMoviesById({ inputUserId: userId, filter });

    const promises = [];

    for (const userMovie of userMovieResponse) {
      const commonArgs = {
        movieTitle: userMovie.title,
        apiKey: omdbAPIKey,
        devMode: devMode,
        userMovieWatchedState: userMovie.watched,
        userMovieId: userMovie.id
      };

      if (userMovie.imdbId !== null) {
        promises.push(getOMDBMovie({ ...commonArgs, method: 'imdbID', imdbID: userMovie.imdbId }));
      } else {
        promises.push(getOMDBMovie({ ...commonArgs, method: 'title' }));
      }
    }

    const data = await Promise.all(promises);

    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error(error);
    return { error }
  }
}; 
