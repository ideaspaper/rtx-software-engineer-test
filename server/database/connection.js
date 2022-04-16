import pg from 'pg';
const { Pool } = pg;

const connectionOptions = {};

switch (process.env.NODE_ENV) {
  case 'development':
    connectionOptions.user = process.env.DB_USERNAME_DEV || 'postgres';
    connectionOptions.host = process.env.DB_HOST_DEV || '127.0.0.1';
    connectionOptions.database = process.env.DB_DATABASE_DEV || 'rtx_db_dev';
    connectionOptions.password = process.env.DB_PASSWORD_DEV || 'postgres';
    connectionOptions.port = process.env.DB_PORT_DEV || 5432;
    break;
  case 'test':
    connectionOptions.user = process.env.DB_USERNAME_TEST || 'postgres';
    connectionOptions.host = process.env.DB_HOST_TEST || '127.0.0.1';
    connectionOptions.database = process.env.DB_DATABASE_TEST || 'rtx_db_test';
    connectionOptions.password = process.env.DB_PASSWORD_TEST || 'postgres';
    connectionOptions.port = process.env.DB_PORT_TEST || 5432;
    break;
  case 'production':
    connectionOptions.user = process.env.DB_USERNAME_PROD || 'postgres';
    connectionOptions.host = process.env.DB_HOST_PROD || '127.0.0.1';
    connectionOptions.database = process.env.DB_DATABASE_PROD || 'rtx_db';
    connectionOptions.password = process.env.DB_PASSWORD_PROD || 'postgres';
    connectionOptions.port = process.env.DB_PORT_PROD || 5432;
    break;
}

const pool = new Pool(connectionOptions);

export default pool;
