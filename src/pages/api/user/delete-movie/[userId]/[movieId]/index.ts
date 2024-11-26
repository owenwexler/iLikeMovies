import { deleteUserMovie } from "../../../../../../db/models/userMovies";

export const DELETE: APIRoute = async ({ params, request }) => {
  const { userId, movieId } = params;
  
  try {
    const deleteMovieResponse = await deleteUserMovie({ userId, userMovieId: movieId });
    return new Response(
      JSON.stringify(deleteMovieResponse),
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
