import{Pool} from 'pg';
import { Client } from 'pg';

/*
export const client = new Client({
  connectionString: process.env.DATABASE_URL,
});
*/

export const client = new Client({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || 'postgres',
  ssl: ((process.env.DB_SSL && process.env.DB_SSL.toLowerCase() == 'true') || false)
    ? { rejectUnauthorized: false } : false,
});
