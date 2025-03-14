import { blankOMDBResponse } from '../src/data/blankOMDBResponse';
import type { NetworkError } from '../src/typedefs/NetworkError';
import type { OMDBError } from '../src/typedefs/OMDBError';
import type { OMDBMovieResponse } from '../src/typedefs/OMDBMovieResponse';
import type { OMDBRatingResponse } from '../src/typedefs/OMDBRatingResponse';
import { getOMDBOfflineMovieByTitle } from './omdbOffline/omdbOffline';
import redis from '../redis/redis';
import type { KeyValueOMDBResponses } from '../src/typedefs/KeyValueOMDBResponses';
import { cacheOMDBResponse } from './cacheOMDBResponse';

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
  userMovieId: string;
}): Promise<OMDBMovieResponse | NetworkError> => {
  const { movieTitle, apiKey, devMode, method, userMovieWatchedState, userMovieId } = args;

  if (devMode === 'offline') {
    console.log('OFFLINE: offline mode hit');
    const result = await getOMDBOfflineMovieByTitle(movieTitle, userMovieWatchedState, userMovieId);
    return result;
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
  
  const searchQuery = methodInitial === 'i' && imdbID ? imdbID : movieTitle.toLowerCase();

  try {
    // caching all the OMDB responses in one key creates a race condition if OMDB calls are parallelized (which is likely to happen) so each response gets a separate key
    const cachedOMDBResponse = await redis.get(`ilm::cached-omdb-response::${searchQuery}`);
    const cachedOMDBResult = JSON.parse(cachedOMDBResponse);
    
    if (cachedOMDBResult) {
      console.log(`Cache Hit: ${searchQuery}`)
      const result = { ...cachedOMDBResult };
      const finalTitle = movieTitle ? movieTitle : result.Title;
      return formatOMDBMovie({ title: finalTitle, movieData: result, userMovieWatchedState, userMovieId });
    } else {
      console.log(`Cache Miss: ${searchQuery} - making live OMDB call`);
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&${methodInitial}=${searchQuery}&r=json&plot=short`,
      );
      const result = await response.json();
      const setExResult = await cacheOMDBResponse(searchQuery, result);
      const finalTitle = movieTitle ? movieTitle : result.Title;
      return formatOMDBMovie({ title: finalTitle, movieData: result, userMovieWatchedState, userMovieId });
    }

  } catch (error) {
    const err: string = error ? error.toString() : '';
    return { error: err };
  }
};

interface FormatOMDBMovieArgs {
  title: string;
  movieData: OMDBMovieResponse | OMDBError;
  userMovieWatchedState?: boolean;
  userMovieId: string;
}
const formatOMDBMovie = (args: FormatOMDBMovieArgs): Movie => {
  const { title, movieData, userMovieWatchedState, userMovieId } = args;

  const typedMovieResponse = movieData.Response === 'True' ? (movieData as OMDBMovieResponse) : blankOMDBResponse;

  if (movieData.Response === 'False') {
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

    const formattedMovieResponse = {
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
    };

    return {
      ...formattedMovieResponse,
      watched: userMovieWatchedState ? userMovieWatchedState : false,
      userMovieId: userMovieId
    }
  }
};

export { getOMDBMovie, formatOMDBMovie };
