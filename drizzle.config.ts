import { defineConfig } from 'drizzle-kit';

const env = import.meta.env;
const dbUrl = env.DB_URL;
console.log('db url in drizzle config: ', dbUrl);

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: import.meta.env.DB_URL!,
  },
});
