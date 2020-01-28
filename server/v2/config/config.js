/* eslint-disable import/no-mutable-exports */
/* eslint-disable comma-dangle */
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let pool;

const isProduction = process.env.NODE_ENV === 'production';

if (process.env.NODE_ENV === 'isTesting') {
  pool = new Pool({
    connectionString: process.env.TESTING
  });
} else if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    connectionString: isProduction,
    ssl: isProduction
  });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });
}

export default pool;
