import { getSingleUserMovieById, setMovieWatched } from '../../db/models/userMovies';

import { getOMDBEnvVariables } from '../getOMDBEnvVariables';

import { getOMDBMovie } from '../../../omdb/omdb';

interface ToggleUserMovieArgs {
  userId: string;
  movieId: string;
  watchedStateParam: 'watched' | 'unwatched';
}

const toggleUserMovie = async (args: ToggleUserMovieArgs) => {
  const { userId, movieId, watchedStateParam } = args;
  
  const { omdbAPIKey, nodeEnv, devMode, hostUrl } = getOMDBEnvVariables(Bun.env as Env);

  const currentMovieWatchedState = watchedStateParam === 'unwatched' ? false : true;
  
  try {
    let formattedMovie: Movie;
    
    const result = await setMovieWatched({ userMovieId: movieId, currentMovieWatchedState });
    const newMovie = await getSingleUserMovieById({ userId, userMovieId: movieId });

    const commonArgs = {
      movieTitle: newMovie.title,
      apiKey: omdbAPIKey,
      devMode: devMode,
      userMovieWatchedState: newMovie.watched,
      userMovieId: newMovie.id
    };

    if (newMovie.imdbId !== null) {
      formattedMovie = await getOMDBMovie({ ...commonArgs, method: 'imdbID', imdbID: newMovie.imdbId });
    } else {
      formattedMovie = await getOMDBMovie({ ...commonArgs, method: 'title' });
    }

    return formattedMovie;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { toggleUserMovie }
