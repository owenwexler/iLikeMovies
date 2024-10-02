import omdbOfflineData from "./omdbOfflineData.json" assert { type: "json" };
import type { OMDBMovieResponse } from "../../src/typedefs/OMDBMovieResponse";
import type { KeyValueOMDBResponses } from "../../src/typedefs/KeyValueOMDBResponses";
import { formatOMDBMovie } from "../omdb";
import { movieNotFound } from "../../src/data/movieNotFound";

const typedOMDBOfflineData = omdbOfflineData
  ? (omdbOfflineData as KeyValueOMDBResponses)
  : ({} as KeyValueOMDBResponses);

const getOMDBOfflineMovieByTitle = (title: string) => {
  const result = typedOMDBOfflineData[title as keyof typeof typedOMDBOffline];
  if (result) {
    return formatOMDBMovie({ title, movieData: result as OMDBMovieResponse });
  } else {
    return movieNotFound;
  }
};

export { getOMDBOfflineMovieByTitle };
