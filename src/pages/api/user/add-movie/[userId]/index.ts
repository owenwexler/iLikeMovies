import type { APIRoute } from "astro";
import { getOMDBMovie } from "../../../../../../omdb/omdb";
import { ulid } from "ulid";

export const POST: APIRoute = async ({ params, request }) => {
  const { userId } = params; 

  const searchParams = request.url.slice(request.url.indexOf('?'));

  const title: string = searchParams.slice(searchParams.indexOf('=') + 1).toString();

  const userMovieId = ulid();

  // TODO: add the rest of this function.  Figure out a way to get the movie from OMDB before adding the user movie to the database so we only have to do one database call

}
