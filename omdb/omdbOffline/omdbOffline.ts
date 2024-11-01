import omdbOfflineData from "./omdbOfflineData.json" assert { type: "json" };
import type { OMDBMovieResponse } from "../../src/typedefs/OMDBMovieResponse";
import type { KeyValueOMDBResponses } from "../../src/typedefs/KeyValueOMDBResponses";
import { formatOMDBMovie } from "../omdb";
import { movieNotFound } from "../../src/data/movieNotFound";

const typedOMDBOfflineData = omdbOfflineData
  ? (omdbOfflineData as KeyValueOMDBResponses)
  : ({} as KeyValueOMDBResponses);

const fullOMDBOfflineData: KeyValueOMDBResponses = { ...typedOMDBOfflineData };

for (const key in typedOMDBOfflineData) {
  const movie = typedOMDBOfflineData[key as keyof typeof typedOMDBOfflineData];
  const { imdbID } = movie;

  fullOMDBOfflineData[imdbID] = { ...movie };
}

const getOMDBOfflineMovieByTitle = (title: string, userMovieWatchedState?: boolean, userMovieId?: string) => {
  const result = typedOMDBOfflineData[title.toLowerCase() as keyof typeof typedOMDBOffline];
  const watchedState = userMovieWatchedState ? userMovieWatchedState : false;
  if (result) {
    return formatOMDBMovie({ title, movieData: result as OMDBMovieResponse, userMovieWatchedState: watchedState, userMovieId });
  } else {
    return { ...movieNotFound, title, response: false, watched: userMovieWatchedState ? userMovieWatchedState : false, userMovieId };
  }
};

export { getOMDBOfflineMovieByTitle };
