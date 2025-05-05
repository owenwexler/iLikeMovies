import { Hono } from 'hono';
import { addUserMovie, deleteUserMovie, getUserMoviesById } from '../db/models/userMovies';
import { getOMDBEnvVariables } from '../helper/getOMDBEnvVariables';
import { getOMDBMovie } from '../../omdb/omdb';
import { getTypedFilter } from '../helper/getTypedFilter';
import MovieList from '../components/MovieList/MovieList';
import { html } from 'hono/html';
import { confirmDeleteButtonClasses, revertDeleteButtonClasses } from '../components/style/twClasses/buttonClasses';
import { getCurrentUserId } from '../helper/getCurrentUserId';
import FilterForm from '../components/FilterForm/FilterForm';
import MovieListItemInner from '../components/MovieList/MovieListItemInner';
import MovieListItem from '../components/MovieList/MovieListItem';
import Error from '../components/Error/Error';
import { formatUrlTitle } from '../helper/formatUrlTitle';
import { ulid } from 'ulid';
import { getAllUserMovies } from '../helper/userMovieHelpers/getAllUserMovies';
import { toggleUserMovie } from '../helper/userMovieHelpers/toggleUserMovie';

const partialsRoute = new Hono();

const { omdbAPIKey, nodeEnv, devMode, hostUrl } = getOMDBEnvVariables(Bun.env as Env);

partialsRoute.get('/user/movies/:userId', async (c) => {
  const { userId } = c.req.param();
  console.log(`GET /user/movies/${userId}`);

  const filterParam = c.req.query('filter');
  const filter: FilterUnionType = getTypedFilter(filterParam);

  try {
    const movies = await getAllUserMovies({ userId, filter });

    return c.html(
      <MovieList movies={movies} filter={filter}/>
    );
  } catch (error) {
    console.error(error);

    return c.html(
      <Error />
    );
  }
});

partialsRoute.post('/user/toggle/:userId/:movieId', async (c) => {
  const { userId, movieId } = c.req.param();
  
  const watchedStateParam = c.req.query('watched');

  try {
    const movie = await toggleUserMovie({ userId, movieId, watchedStateParam });
    const finalWatchedStateParam = movie.watched ? 'watched' : 'unwatched';

    return c.html(
      <MovieListItemInner movie={movie} userId={userId} userMovieId={movieId} watchedStateParam={finalWatchedStateParam} filter="all" /> 
    );
  } catch (error) {
    console.error(error);

    return c.html(
      <Error />
    );
  }
});

partialsRoute.post('/user/toggle-filtered/:userId/:movieId', async (c) => {
  const { userId, movieId } = c.req.param();

  const filter = getTypedFilter(c.req.query('filter'));

  const watchedStateParam = c.req.query('watched');
  
  try {
    const movie = await toggleUserMovie({ userId, movieId, watchedStateParam });

    const finalWatchedStateParam: 'watched' | 'unwatched' = movie.watched ? 'watched' : 'unwatched';
 
    const movies = await getAllUserMovies({ userId, filter });

    return c.html(
      <MovieList movies={movies} filter={filter}/>
    )
  } catch (error) {
    console.error(error);

    return c.html(
      <Error />
    );
  }
});

partialsRoute.get('/user/are-you-sure/:userId/:movieId', async (c) => {
  const { userId, movieId } = c.req.param();

  return c.html(
    <div class="flex flex-col items-center justify-center">
      <h1 class="text-lg font-bold">Are you sure?</h1>
      <div class="flex flex-row items-center justify-center space-x-3">
        <button
          id={`confirm-delete-${movieId}`}
          class={confirmDeleteButtonClasses}
          hx-delete={`partials/user/delete-movie/${userId}/${movieId}`}
          hx-target="#movie-list-container"
          hx-replace="innerHTML"
          hx-trigger="click"
          hx-boost={true}
        >
          Yes
        </button>
        <button
          id={`revert-delete-${movieId}`}
          class={revertDeleteButtonClasses}
          hx-get={`partials/user/revert-delete-movie/${userId}/${movieId}`}
          hx-target={`#are-you-sure-${movieId}`}
          hx-replace="outerHTML"
          hx-trigger="click"
        >
          No
        </button>
      </div>
    </div>
  );
});

partialsRoute.get('/user/revert-delete-movie/:userId/:movieId', async (c) => {
  const { movieId } = c.req.param();

  return c.html(
    <div id={`are-you-sure-${movieId}`}>

    </div>
  )
});

partialsRoute.get('/reset-filter-form', async (c) => {
  const userId = getCurrentUserId();

  return c.html(
    <FilterForm userId={userId} />
  );
});

partialsRoute.post('/user/add-movie/:userId', async (c) => {
  const { userId } = c.req.param();

  const formData = await c.req.parseBody();

  const title = formatUrlTitle(formData.movieTitle as string);

  try {
    const userMovieId = ulid();
    
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

    const movies = await getAllUserMovies({ userId, filter: 'all' });
    return c.html(
      <MovieList movies={movies} filter="all" />
    );
  } catch (error) {
    console.error(error);
    return c.html(<Error />);
  }
});

partialsRoute.delete('/user/delete-movie/:userId/:movieId', async (c) => {
  const { userId, movieId } = c.req.param();

  try {
    const deleteMovieResponse = await deleteUserMovie({ userId, userMovieId: movieId });
    
    const movies = await getAllUserMovies({ userId, filter: 'all' });
    
    return c.html(
      <MovieList movies={movies} filter="all" />
    );
  } catch (error) {
    console.error(error);
    return c.html(
      <>
        <div class="flex flex-col items-center justify-center text-center">
          <p class="text-lg text-white font-bold">Error deleting movie.  Please try again.</p>
        </div>
      </>
    );
  }
});

export default partialsRoute;
