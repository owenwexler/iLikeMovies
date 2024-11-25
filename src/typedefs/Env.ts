interface Env {
  NODE_ENV: 'development' | 'production' | 'staging';
  OMDB_API_KEY: string;
  DEV_MODE: 'offline' | 'online';
  HOST_URL: string;
  DB_URL: string;
}

export type {
  Env
}
