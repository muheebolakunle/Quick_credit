import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
let connectionString;

if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.DATABASE_URL_TEST;
}

if (process.env.NODE_ENV === 'production') {
  connectionString = process.env.DATABASE_URL;
}

const pool = new Pool({ connectionString, ssl: {
    rejectUnauthorized: false
  } });

export default pool;
