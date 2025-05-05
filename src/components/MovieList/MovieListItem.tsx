import { FC } from 'hono/jsx';
import { movieNotFound } from "../../data/movieNotFound";
import { buttonClasses } from "../style/twClasses/buttonClasses";
import { Image } from "astro:assets";

import { userId } from '../../data/hardcodedUserId';
import { formatTitleForId } from "../../helper/formatTitleForId";
import type { UserMovie } from '../../typedefs/UserMovie';
import type { FilterUnionType } from '../../typedefs/FilterUnionType';

import PageCard from '../style/PageCard';
import MovieListItemInner from './MovieListItemInner';

interface MovieListItemProps {
  movie: UserMovie;
  filter: FilterUnionType
}

const MovieListItem: FC<MovieListItemProps> = ({ movie, filter }) => {
  const {
    title,
    year,
    rated,
    runtime,
    genre,
    director,
    watched
  } = movie;

  const imageUrl = movie.poster && movie.poster !== 'No info available' ? movie.poster : '/static/images/not-found.png';

  const buttonSwapIdFallback = movie.imdbId ? movie.imdbId : title.split(' ').join('-').toLowerCase(); // we should not have to use this but it is there just in case
  const userMovieId = movie.userMovieId ? movie.userMovieId : buttonSwapIdFallback;

  const watchedStateParam = watched ? 'watched' : 'unwatched';

  const deleteButtonClasses = `${buttonClasses} w-full bg-red-600 hover:bg-red-500 py-1`;

  const titleId = formatTitleForId(title);

  return (
    <PageCard id={`movie-list-item-page-card-${titleId}`} testId="movie-list-item-page-card">
      <div class="flex flex-row items-between justify-between">
        <img
          id={`movie-list-item-image-${titleId}`}
          data-testid="movie-list-item-image"
          src={imageUrl} 
          alt={title} 
          width={100} 
          height={75} 
        />
        <MovieListItemInner 
          movie={movie} 
          userId={userId} 
          userMovieId={userMovieId} 
          watchedStateParam={watchedStateParam}
          filter={filter}
        /> 
      </div>
      <div class="flex flex-col items-center justify-center mt-3">
        <button 
          id={`delete-movie-${titleId}`} 
          data-testid="delete-movie-button"
          class={deleteButtonClasses}
          hx-get={`/partials/user/are-you-sure/${userId}/${userMovieId}`}
          hx-trigger="click"
          hx-target={`#are-you-sure-${userMovieId}`}
          hx-replace="innerHTML"
          hx-boost={true}
        >
          DELETE THIS MOVIE
        </button>
        <div id={`are-you-sure-${userMovieId}`}>

        </div>
      </div>
    </PageCard>
  )
}

export default MovieListItem;
