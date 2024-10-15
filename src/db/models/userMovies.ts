import { eq } from 'drizzle-orm';
import { db } from '../db';
import { userMovies } from '../schema';

interface GetUserMoviesByIdArgs {
  inputUserId: string;
}

const getUserMoviesById = async (args: GetUserMoviesByIdArgs) => {
  const { inputUserId } = args;

  try {
    const result = await db.select().from(userMovies).where(eq(userMovies.userId, inputUserId));
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

interface SetMovieWatchedArgs {
  userMovieId: string;
  currentMovieWatchedState: boolean;
}

const setMovieWatched = async (args: SetMovieWatchedArgs) => {
  const { 
    userMovieId, 
    currentMovieWatchedState 
  } = args;

  const newMovieWatchedState = !currentMovieWatchedState;

  try {
    const result = await db.update(userMovies)
    .set({ watched: newMovieWatchedState })
    .where(eq(userMovies.id, userMovieId));

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export {
  getUserMoviesById,
  setMovieWatched
}
