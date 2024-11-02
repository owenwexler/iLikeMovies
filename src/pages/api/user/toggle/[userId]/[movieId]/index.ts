import { setMovieWatched } from "../../../../../../db/models/userMovies";

export const GET: APIRoute = async ({ params, request }) => {
  const { userId, movieId } = params;

  const searchParams = request.url.slice(request.url.indexOf('?'));

  const watchedStateParam = searchParams.slice(searchParams.indexOf('=') + 1);

  const watchedState = watchedStateParam === 'unwatched' ? false : true;

  try {
    const result = await setMovieWatched({ userMovieId: movieId, currentMovieWatchedState: watchedState });
    console.log('result from update db call: ', result);

    return new Response(
      JSON.stringify({ newWatchedState: !watchedState }),
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
