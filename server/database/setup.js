import 'dotenv/config';
import pool from './connection.js';

const query = {
  name: 'create-table-catfacts',
  text: `
    CREATE TABLE IF NOT EXISTS "CatFacts" (
      "id"        VARCHAR    PRIMARY KEY,
      "user"      VARCHAR,
      "text"      TEXT,
      "source"    VARCHAR,
      "updatedAt" TIMESTAMP,
      "type"      VARCHAR,
      "createdAt" TIMESTAMP,
      "verified"  BOOLEAN
    );
  `
};

pool.query(query, (error) => {
  if (error) console.log(error);
  else console.log('migration success');
});
