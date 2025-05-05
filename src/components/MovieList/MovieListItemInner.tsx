import { FC } from 'hono/jsx';
import { buttonClasses } from '../style/twClasses/buttonClasses';
import type { FilterUnionType } from "../../typedefs/FilterUnionType";

import { getTypedFilter } from "../../helper/getTypedFilter";
import { getTruncatedGenres } from "../../helper/getTruncatedGenres";
import { formatTitleForId } from "../../helper/formatTitleForId";
import type { UserMovie } from '../../typedefs/UserMovie';

interface MovieListItemInnerProps {
  movie: UserMovie;
  userId: string;
  userMovieId: string;
  watchedStateParam: 'watched' | 'unwatched';
  filter: FilterUnionType;
}

const MovieListItemInner: FC<MovieListItemInnerProps> = ({ movie, userId, userMovieId, watchedStateParam, filter }) => {
  // this is the only way to have a div that is replacable by HTMX without screwing up the layout, this keeps the swapped out content within the PageCard component.  Including the image in this component caused it to flicker on every toggle of the watched button which is unacceptable so the image will not be included in this component.
  console.log('watchedStateParam: ', watchedStateParam)

  const { title, year, rated, genre, watched } = movie;

  const buttonText = watched ? 'Watched' : 'To Watch';

  const route = filter === 'all' ? `/partials/user/toggle/${userId}/${userMovieId}?watched=${watchedStateParam}` : `/partials/user/toggle-filtered/${userId}/${userMovieId}?watched=${watchedStateParam}&filter=${filter}`;

  const target = filter === 'all' ? `#movie-list-item-inner-container-${userMovieId}` : '#movie-list-container';

  const titleId = formatTitleForId(title);
  
  return (
    <div id={`movie-list-item-inner-container-${userMovieId}`} class="flex flex-col items-end justify-end">
      <h1 id={`movie-list-item-title-${titleId}`} class="text-xl lg:text-2xl max-sm:text-lg font-bold">{title.length > 20 ? `${title.slice(0, 16)}...` : title}</h1>
      <h2 id={`movie-list-item-year-${titleId}`} class="text-lg lg:text-xl max-sm:text-md">{year}</h2>
      <h2 id={`movie-list-item-rating-${titleId}`} class="text-lg lg:text-xl max-sm:text-md">{rated}</h2>
      <h2 id={`movie-list-item-genres-${titleId}`} class="text-lg lg:text-xl max-sm:text-md">{getTruncatedGenres(genre)}</h2>
      <div 
        id={`watched-div-${userMovieId}`}
        class="mt-4"
      >
        <button
          id={`watched-button-${titleId}`}
          data-testid="watched-button"
          class={buttonClasses}
          hx-post={route}
          hx-trigger="click"
          hx-target={target}
          hx-swap="innerHTML"
          hx-boost="true"
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default MovieListItemInner;

