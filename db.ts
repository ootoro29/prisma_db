import{Pool} from 'pg';

/*
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
*/


export const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || 'postgres',
  ssl: ((process.env.DB_SSL && process.env.DB_SSL.toLowerCase() == 'true') || false)
    ? { rejectUnauthorized: false } : false,
});

