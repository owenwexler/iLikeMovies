import { getSingleUserMovieById } from "../../../../../../db/models/userMovies";
import { getOMDBEnvVariables } from "../../../../../../helper/getOMDBEnvVariables";
import type { Movie } from "../../../../../../typedefs/Movie";

export const GET: APIRoute = async ({ params, request }) => {
  const { userId, movieId } = params;

  const { omdbAPIKey, nodeEnv, devMode } = getOMDBEnvVariables(import.meta.env as Env);

  try {
    const userMovie: UserMovie = await getSingleUserMovieById({ userId, userMovieId: movieId });

    const commonArgs = {
      movieTitle: userMovie.title,
      apiKey: omdbAPIKey,
      devMode: devMode,
      userMovieWatchedState: userMovie.watched,
      userMovieId: userMovie.id
    };

    if (userMovie.imdbId !== null) {
      const data = await getOMDBMovie({ ...commonArgs, method: 'imdbID', imdbID: userMovie.imdbId });
      return new Response(JSON.stringify(data), { status: 200 });
    } else {
      const data = await getOMDBMovie({ ...commonArgs, method: 'title' });
      return new Response(JSON.stringify(data), { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
} 
