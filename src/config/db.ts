import { Pool } from 'pg';
import { env } from './env.js';

export const pool = new Pool({ connectionString: env.databaseUrl });

export const healthCheck = async () => {
  const client = await pool.connect();
  try {
    await client.query('SELECT 1');
  } finally {
    client.release();
  }
};
