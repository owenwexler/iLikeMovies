import omdbOfflineData from "./omdbOfflineData.json" assert { type: "json" };
import type { OMDBMovieResponse } from "../../src/typedefs/OMDBMovieResponse";
import type { KeyValueOMDBResponses } from "../../src/typedefs/KeyValueOMDBResponses";
import { formatOMDBMovie } from "../omdb";
import { movieNotFound } from "../../src/data/movieNotFound";
import { checkCache } from "../../redis/checkCache";
import redis from "../../redis/redis";
import { cacheOMDBResponse } from "../cacheOMDBResponse";
import { notFoundOMDBResponse } from "../../src/data/notFoundOMDBResponse";

const typedOMDBOfflineData = omdbOfflineData
  ? (omdbOfflineData as KeyValueOMDBResponses)
  : ({} as KeyValueOMDBResponses);

const fullOMDBOfflineData: KeyValueOMDBResponses = { ...typedOMDBOfflineData };

for (const key in typedOMDBOfflineData) {
  const movie = typedOMDBOfflineData[key as keyof typeof typedOMDBOfflineData];
  const { imdbID } = movie;
 
  fullOMDBOfflineData[imdbID] = { ...movie };
}

const getOMDBOfflineMovieByTitle = async (title: string, userMovieWatchedState?: boolean, userMovieId?: string) => {
  const lowerCaseTitle = title.toLowerCase();
  const key = `ilm::cached-omdb-response::${lowerCaseTitle}`;

  const cachedOMDBResponse = await redis.get(key);
  const cachedOMDBResult = JSON.parse(cachedOMDBResponse);
  
  const watchedState = userMovieWatchedState ? userMovieWatchedState : false;
  try {
    if (cachedOMDBResult) {
      console.log(`Cache Hit - ${key}`);
      if (cachedOMDBResult.Response = 'False') {
        return { ...movieNotFound, title, response: false, watched: userMovieWatchedState ? userMovieWatchedState : false, userMovieId };
      } else {
        return formatOMDBMovie({ title, movieData: cachedOMDBResult as OMDBMovieResponse, userMovieWatchedState: watchedState, userMovieId });
      }
    } else {
      console.log(`Cache Miss - ${key} - doing live OMDB call`);
      const response = typedOMDBOfflineData[lowerCaseTitle as keyof typeof typedOMDBOffline];
      const result = response ? response as OMDBMovieResponse : null;
      
      if (result && result.Response === 'True') {
        const setExResult = await cacheOMDBResponse(lowerCaseTitle, result);
        return formatOMDBMovie({ title, movieData: result as OMDBMovieResponse, userMovieWatchedState: watchedState, userMovieId });
      } else {
        const setExResult = await cacheOMDBResponse(lowerCaseTitle, { ...notFoundOMDBResponse, title })
        return { ...movieNotFound, title, response: false, watched: userMovieWatchedState ? userMovieWatchedState : false, userMovieId };
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getOMDBOfflineMovieByTitle };
