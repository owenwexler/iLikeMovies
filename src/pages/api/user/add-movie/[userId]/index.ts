import type { APIRoute } from "astro";
import { getOMDBMovie } from "../../../../../../omdb/omdb";
import { addUserMovie } from '../../../../../db/models/userMovies';
import { ulid } from "ulid";
import { getOMDBEnvVariables } from "../../../../../helper/getOMDBEnvVariables";

export const POST: APIRoute = async ({ params, request }) => {
  const { userId } = params;

  const body = await request.json();

  const { title } = body;

  const userMovieId = ulid();

  const { omdbAPIKey, nodeEnv, devMode } = getOMDBEnvVariables(import.meta.env as Env);
  
  try {
    const omdbMovieResponse = await getOMDBMovie({
      movieTitle: title,
      apiKey: omdbAPIKey,
      devMode,
      method: 'search',
      userMovieWatchedState: false,
      userMovieId
    });

    const addUserMovieResponse = await addUserMovie({
      title,
      userMovieId,
      userId,
      imdbId: omdbMovieResponse.imdbID ? omdbMovieResponse.imdbID : null
    });

    console.log(addUserMovieResponse);

    return new Response(
      JSON.stringify(omdbMovieResponse),
      {
        status: 200
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}
