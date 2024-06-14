import{Pool} from 'pg';
import { Client } from 'pg';

export const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

