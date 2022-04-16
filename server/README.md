# README

## Getting Started Locally

1. This server requires Node.js (16.x.x) and PostgreSQL to be installed in your local machine. See links below for more information.

   - [PostgreSQL](https://www.postgresql.org/download/)
   - [Node.js](https://nodejs.org/en/)

2. Run the command below in terminal to install all the dependencies.

   ```
   $ npm install
   ```

3. Create a new database in PostgreSQL manually. You can use your favorite SQL client software such as DBeaver, pgAdmin, etc. If you use psql instead, you can use command below.

   ```
   $ psql -U postgres
   postgres=# create database <database_name>;
   ```

4. Create a **.env** file as below.

   ```
   PORT=

   NODE_ENV=

   DB_USERNAME_DEV=
   DB_PASSWORD_DEV=
   DB_DATABASE_DEV=
   DB_HOST_DEV=

   DB_USERNAME_TEST=
   DB_PASSWORD_TEST=
   DB_DATABASE_TEST=
   DB_HOST_TEST=

   DB_USERNAME_PROD=
   DB_PASSWORD_PROD=
   DB_DATABASE_PROD=
   DB_HOST_PROD=

   SOURCE_API=
   ```

   - `PORT`: Port where the server will run.
   - `NODE_ENV`: Node environment. This can be either **development**, **test** or **production**.
   - `DB_USERNAME_X`: Database username (defaults to **postgres**) for **X** environment.
   - `DB_PASSWORD_X`: Database password (defaults to **postgres**) for **X** environment.
   - `DB_DATABASE_X`: Database name for **X** environment.
   - `DB_HOST_X`: Database host (defaults to **127.0.0.1**) for **X** environment.
   - `SOURCE_API`: API URL to fetch all the cat facts (https://cat-fact.herokuapp.com).

5. Run the command below in terminal to run the database migration.

   ```
   $ npm run migrate
   ```

6. Start the server.

   ```
   $ npm start
   ```

## Getting Started using Deployed Server

Instead or running this server locally, you can find the deployed server on https://rtx-cat-facts.herokuapp.com/.

## Reference

REST API documentation can be found on https://documenter.getpostman.com/view/19160763/Uyr5neGu.
