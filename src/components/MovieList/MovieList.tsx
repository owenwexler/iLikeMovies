import { FC } from 'hono/jsx';

import MovieListItem from './MovieListItem';

import type { FilterUnionType } from '../../typedefs/FilterUnionType';
import type { UserMovie } from '../../typedefs/UserMovie';

interface MovieListProps {
  movies: UserMovie[];
  filter: FilterUnionType;
}

const MovieList: FC<MovieListProps> = ({ movies, filter }) => {
  return (
    <>
      {
        movies.map(movie => 
          <MovieListItem movie={movie} filter={filter} /> 
        )
      }
    </>
  )
}

export default MovieList;
