interface Env {
  NODE_ENV: 'development' | 'production' | 'staging';
  OMDB_API_KEY: string;
  DEV_MODE: 'offline' | 'online';
  HOST_URL: string;
  POSTGRES_URL: string;
}

export type {
  Env
}
