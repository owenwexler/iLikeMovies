import { blankOMDBResponse } from "../src/data/blankOMDBResponse";
import type { NetworkError } from "../src/typedefs/NetworkError";
import type { OMDBError } from "../src/typedefs/OMDBError";
import type { OMDBMovieResponse } from "../src/typedefs/OMDBMovieResponse";
import type { OMDBRatingResponse } from "../src/typedefs/OMDBRatingResponse";
import { getOMDBOfflineMovieByTitle } from "./omdbOffline/omdbOffline";

const formatRatingsInOMDBResponse = (
  ratings: OMDBRatingResponse[],
): Rating[] => {
  return ratings.map((rating) => {
    return { source: rating.Source, value: rating.Value };
  });
};

const getOMDBMovieByTitle = async (args: {
  movieTitle: string;
  apiKey: string;
  devMode: "online" | "offline";
}): Promise<OMDBMovieResponse | NetworkError> => {
  const { movieTitle, apiKey, devMode } = args;

  if (devMode === "offline") {
    console.log('OFFLINE: offline mode hit');
    return getOMDBOfflineMovieByTitle(movieTitle);
  }

  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKey}&t=${movieTitle.toLowerCase()}&r=json&plot=short`,
    );
    const result = await response.json();
    return formatOMDBMovie({ title: movieTitle, movieData: result });
  } catch (error) {
    const err: string = error ? error.toString() : "";
    return { error: err };
  }
};

interface FormatOMDBMovieArgs {
  title: string;
  movieData: OMDBMovieResponse | OMDBError;
}
const formatOMDBMovie = (args: FormatOMDBMovieArgs): Movie => {
  const { title, movieData } = args;

  const typedMovieResponse = movieData.Response === "True" ? (movieData as OMDBMovieResponse) : blankOMDBResponse;

  if (movieData.Response === "False") {
    return {
      ...movieNotFound,
      title,
    };
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
    };
  }
};

export { getOMDBMovieByTitle, formatOMDBMovie };
