import { setMovieWatched, getSingleUserMovieById } from "../../../../../../db/models/userMovies";
import type { Movie } from "../../../../../../typedefs/Movie";

export const GET: APIRoute = async ({ params, request }) => {
  const { userId, movieId } = params;

  const searchParams = request.url.slice(request.url.indexOf('?'));

  const watchedStateParam = searchParams.slice(searchParams.indexOf('=') + 1);

  const watchedState = watchedStateParam === 'unwatched' ? false : true;

  const env = import.meta.env;
  const omdbAPIKey = env.OMDB_API_KEY;
  const nodeEnv = env.NODE_ENV ? env.NODE_ENV : 'development';
  const devMode = nodeEnv === "development" && env.DEV_MODE === 'offline' ? 'offline' : 'online';

  try {
    const result = await setMovieWatched({ userMovieId: movieId, currentMovieWatchedState: watchedState });
    const newMovie = await getSingleUserMovieById({ userId, userMovieId: movieId });

    // TODO: the cache MUST be used/leveraged here - an OMDB call for every toggle would be a disaster!
    const commonArgs = {
      movieTitle: userMovie.title,
      apiKey: omdbAPIKey,
      devMode: devMode,
      userMovieWatchedState: userMovie.watched,
      userMovieId: userMovie.id
    };

    let formattedMovie: Movie;

    if (userMovie.imdbId !== null) {
      formattedMovie = await getOMDBMovie({ ...commonArgs, method: 'imdbID', imdbID: userMovie.imdbId });
    } else {
      formattedMovie = await getOMDBMovie({ ...commonArgs, method: 'title' });
    }

    return new Response(
      JSON.stringify(formattedMovie),
      {
        status: 200
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error }),
      {
        status: 500
      }
    );
  }
}
