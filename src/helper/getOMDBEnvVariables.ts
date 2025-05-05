import type { Env } from "../typedefs/Env";

const getOMDBEnvVariables = (env: Env) => {
  const omdbAPIKey = env.OMDB_API_KEY;
  const nodeEnv = env.NODE_ENV ? env.NODE_ENV : 'development';
  const devMode = nodeEnv === "development" && env.DEV_MODE === 'offline' ? 'offline' : 'online';
  const hostUrl = env.HOST_URL ? env.HOST_URL : 'http://localhost:3000';

  return { omdbAPIKey, nodeEnv, devMode, hostUrl };
}

export {
  getOMDBEnvVariables
}
