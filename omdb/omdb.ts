import { blankOMDBResponse } from '../src/data/blankOMDBResponse';
import type { NetworkError } from '../src/typedefs/NetworkError';
import type { OMDBError } from '../src/typedefs/OMDBError';
import type { OMDBMovieResponse } from '../src/typedefs/OMDBMovieResponse';
import type { OMDBRatingResponse } from '../src/typedefs/OMDBRatingResponse';
import { getOMDBOfflineMovieByTitle } from './omdbOffline/omdbOffline';

const formatRatingsInOMDBResponse = (
  ratings: OMDBRatingResponse[],
): Rating[] => {
  return ratings.map((rating) => {
    return { source: rating.Source, value: rating.Value };
  });
};

const getOMDBMovie = async (args: {
  movieTitle: string;
  imdbID?: string;
  apiKey: string;
  devMode: 'online' | 'offline';
  method: 'title' | 'search' | 'imdbID';
  userMovieWatchedState: boolean;
}): Promise<OMDBMovieResponse | NetworkError> => {
  const { movieTitle, apiKey, devMode, method, userMovieWatchedState } = args;

  if (devMode === 'offline') {
    console.log('OFFLINE: offline mode hit');
    return getOMDBOfflineMovieByTitle(movieTitle, userMovieWatchedState);
  }

  let methodInitial;

  switch(method) {
    case 'title':
      methodInitial = 't';
      break;
    case 'search':
      methodInitial = 's';
      break;
    case 'imdbID':
    case 'imdbId':
    case 'imdbid':
      methodInitial = 'i';
      break;
    default:
      methodInitial = 's';
      break;
  }
  
  const searchQuery = methodInitial === i && imdbID ? imdbID : movieTitle.toLowerCase();

  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKey}&${methodInitial}=${searchQuery}&r=json&plot=short`,
    );
    const result = await response.json();
    const finalTitle = movieTitle ? movieTitle : result.Title;
    return formatOMDBMovie({ title: finalTitle, movieData: result });
  } catch (error) {
    const err: string = error ? error.toString() : '';
    return { error: err };
  }
};

interface FormatOMDBMovieArgs {
  title: string;
  movieData: OMDBMovieResponse | OMDBError;
  userMovieWatchedState?: boolean;
}
const formatOMDBMovie = (args: FormatOMDBMovieArgs): Movie => {
  const { title, movieData, userMovieWatchedState } = args;

  const typedMovieResponse = movieData.Response === 'True' ? (movieData as OMDBMovieResponse) : blankOMDBResponse;

  if (movieData.Response === 'False') {
    console.log('movieData Response false condition hit')
    const result = { ...blankOMDBResponse };
    result[title] = title;
    result[response] = false;
    result[watched] = userMovieWatchedState ? userMovieWatchedState : false;
    return result;
  } else {
    const {
      Title,
      Year,
      Rated,
      Released,
      Runtime,
      Genre,
      Director,
      Writer,
      Actors,
      Plot,
      Language,
      Country,
      Awards,
      Poster,
      Ratings,
      Metascore,
      imdbRating,
      imdbVotes,
      imdbID,
      Type,
      DVD,
      BoxOffice,
      Production,
      Website,
      Response,
    } = typedMovieResponse;

    return {
      title: Title,
      year: Year,
      rated: Rated,
      released: Released,
      runtime: Runtime,
      genre: Genre,
      director: Director,
      writer: Writer,
      actors: Actors,
      plot: Plot,
      language: Language,
      country: Country,
      awards: Awards,
      poster: Poster,
      ratings: formatRatingsInOMDBResponse(Ratings),
      metascore: Metascore,
      imdbRating,
      imdbVotes,
      imdbID,
      type: Type,
      dvd: DVD,
      boxOffice: BoxOffice,
      production: Production,
      website: Website,
      response: Response === 'True' ? true : false,
      watched: userMovieWatchedState ? userMovieWatchedState : false
    };
  }
};

export { getOMDBMovie, formatOMDBMovie };
