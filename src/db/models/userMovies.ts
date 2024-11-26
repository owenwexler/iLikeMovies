import { blankUserMovie } from '../../data/blankUserMovie';
import { isValidULID } from '../../helper/isValidULID';
import type { FilterUnionType } from '../../typedefs/FilterUnionType';
import type { UserMovie } from '../../typedefs/UserMovie';
import sql from '../db';

interface GenericUserMovieModelArgs {
  userId: string;
  userMovieId: string;
}

interface GetUserMoviesByIdArgs {
  inputUserId: string;
  filter?: FilterUnionType;
}

const getUserMoviesById = async (args: GetUserMoviesByIdArgs): UserMovie[] => {
  const { inputUserId, filter } = args;

  if (!isValidULID(inputUserId)) {
    throw new Error('Invalid ULID format at getUserMoviesById');
  }

  let result: unknown;

  try {
    // this is why I hate tagged template literals in a SQL client.  I so wish I could just reuse the base query here instead of copy-pasting it.  Once we get Supabase in this project we can do this more cleanly with the Supabase client
    if (filter === 'watched') {
      result = await sql`SELECT user_movie_id as "id", movie_title AS "title", imdb_id AS "imdbId", user_id AS "userId", watched FROM user_movies WHERE user_id = ${inputUserId} AND watched = TRUE ORDER BY created_at DESC;`;
    } else if (filter === 'unwatched') {
      result = await sql`SELECT user_movie_id as "id", movie_title AS "title", imdb_id AS "imdbId", user_id AS "userId", watched FROM user_movies WHERE user_id = ${inputUserId} AND WATCHED = FALSE ORDER BY created_at DESC;`;
    } else {
      result = await sql`SELECT user_movie_id as "id", movie_title AS "title", imdb_id AS "imdbId", user_id AS "userId", watched FROM user_movies WHERE user_id = ${inputUserId} ORDER BY created_at DESC;`;
    }
    return result ? result as UserMovie[] : [] as UserMovie[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const getSingleUserMovieById = async (args: GenericUserMovieModelArgs) => {
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

interface AddUserMovieArgs extends GenericUserMovieModelArgs {
  title: string;
  imdbId?: string | null;
}

const addUserMovie = async (args: AddUserMovieArgs) => {
  const { title, userMovieId, userId } = args;

  const imdbId: string = args.imdbId ? args.imdbId.toString() : 'NULL';

  if (!isValidULID(userId)) {
    throw new Error('userId is of invalid ULID format at addUserMovie');
  }

  if (!isValidULID(userMovieId)) {
    throw new Error('userMovieId is of invalid ULID format at addUserMovie');
  }

  try {
    const result = await sql`INSERT INTO user_movies (user_movie_id, movie_title, imdb_id, user_id) VALUES (${userMovieId.toString()}, ${title.toString()}, ${imdbId.toString()}, ${userId.toString()});`;
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

interface DeleteUserMovieArgs {
  userId: string;
  userMovieId: string;
}

const deleteUserMovie = async (args: DeleteUserMovieArgs) => {
  const { userId, userMovieId } = args;

  if (!isValidULID(userId)) {
    throw new Error('userId is of invalid ULID format at deleteUserMovie');
  }

  if (!isValidULID(userMovieId)) {
    throw new Error('userMovieId is of invalid ULID format at deleteUserMovie');
  }

  try {
    const result = await sql`DELETE FROM user_movies WHERE user_id = ${userId} AND user_movie_id = ${userMovieId}`;
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export {
  getUserMoviesById,
  getSingleUserMovieById,
  setMovieWatched,
  addUserMovie,
  deleteUserMovie
}
