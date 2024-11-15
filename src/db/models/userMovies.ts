import { blankUserMovie } from '../../data/blankUserMovie';
import { isValidULID } from '../../helper/isValidULID';
import type { UserMovie } from '../../typedefs/UserMovie';
import sql from '../db';

interface GetUserMoviesByIdArgs {
  inputUserId: string;
}

const getUserMoviesById = async (args: GetUserMoviesByIdArgs): UserMovie[] => {
  const { inputUserId } = args;

  if (!isValidULID(inputUserId)) {
    throw new Error('Invalid ULID format at getUserMoviesById');
  }

  try {
    const result = await sql`SELECT user_movie_id as "id", movie_title AS "title", imdb_id AS "imdbId", user_id AS "userId", watched FROM user_movies WHERE user_id = ${inputUserId} ORDER BY created_at DESC;`;
    return result ? result as UserMovie[] : [] as UserMovie[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

interface GetSingleUserMovieByIdArgs {
  userId: string;
  userMovieId: string;
}

const getSingleUserMovieById = async (args: GetSingleUserMovieByIdArgs) => {
  const {
    userId,
    userMovieId
  } = args;

  if (!userId) {
    throw new Error('Unauthorized');
  }

  try {
    const response = await sql`SELECT user_movie_id as "id", movie_title AS "title", imdb_id AS "imdbId", user_id AS "userId", watched FROM user_movies WHERE user_movie_id = ${userMovieId};`;

    const result = response && response[0] ? response[0] as UserMovie : blankUserMovie;

    if (userId !== result.userId) {
      throw new Error('Unauthorized');
    } else {
      return result;
    }
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

  if (!isValidULID(userMovieId)) {
    throw new Error('Invalid ULID format at setMovieWatched');
  }

  const newMovieWatchedState = !currentMovieWatchedState;

  try {
    const result = await sql`UPDATE user_movies SET watched = ${newMovieWatchedState} WHERE user_movie_id = ${userMovieId};`;
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export {
  getUserMoviesById,
  getSingleUserMovieById,
  setMovieWatched
}
