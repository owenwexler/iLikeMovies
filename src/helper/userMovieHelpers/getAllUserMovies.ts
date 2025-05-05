import { getOMDBMovie } from '../../../omdb/omdb';
import { getUserMoviesById } from '../../db/models/userMovies';
import type { FilterUnionType } from '../../typedefs/FilterUnionType';
import { getOMDBEnvVariables } from '../getOMDBEnvVariables';

interface GetAllUserMoviesArgs {
  userId: string;
  filter: FilterUnionType;
}

const getAllUserMovies = async (args: GetAllUserMoviesArgs) => {
  const { userId, filter } = args;
  const { omdbAPIKey, nodeEnv, devMode, hostUrl } = getOMDBEnvVariables(Bun.env as Env);
  
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

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export {
  getAllUserMovies
}
