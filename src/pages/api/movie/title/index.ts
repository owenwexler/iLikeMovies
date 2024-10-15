import type { APIRoute } from 'astro';
import { getOMDBOfflineMovieByTitle } from '../../../../../omdb/omdbOffline/omdbOffline';
import { getOMDBMovie } from '../../../../../omdb/omdb';

export const GET: APIRoute = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const titleParam = searchParams.get('title');
  const title = titleParam ? (titleParam as string) : '';

  const env = import.meta.env;
  const omdbAPIKey = env.OMDB_API_KEY;
  const nodeEnv = env.NODE_ENV ? env.NODE_ENV : 'development';
  const devMode = nodeEnv === "development" && env.DEV_MODE === 'offline' ? 'offline' : 'online';

  try {
    const data = await getOMDBMovie({
      movieTitle: title,
      apiKey: omdbAPIKey,
      devMode: devMode,
      method: 'title'
    });
    return new Response(JSON.stringify(data));
  } catch (err) {
    console.error(err);
    return new Response({ error: err });
  }
};
