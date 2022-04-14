import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USERNAME || 'postgres',
  host: process.env.DB_HOST || '127.0.0.1',
  database: process.env.DB_DATABASE || 'rtx_db',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432
});

export default pool;
