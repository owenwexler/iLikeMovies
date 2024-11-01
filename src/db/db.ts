import postgres from 'postgres';

const env = import.meta.env;
const dbUrl = env.DB_URL;

const sql = postgres(dbUrl);

export default sql;
