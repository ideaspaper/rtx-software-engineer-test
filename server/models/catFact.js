import pool from './../database/connection.js';

class CatFact {
  /**
   * Construct a CatFact object.
   *
   * @param {String} id
   * @param {String} user
   * @param {String} text
   * @param {String} source
   * @param {Date} updatedAt
   * @param {String} type
   * @param {Date} createdAt
   * @param {Boolean} verified
   * @returns {CatFact}
   */
  constructor(id, user, text, source, updatedAt, type, createdAt, verified) {
    this.id = id;
    this.user = user;
    this.text = text;
    this.source = source;
    this.updatedAt = updatedAt;
    this.type = type;
    this.createdAt = createdAt;
    this.verified = verified;
  }

  /**
   * Find a cat fact record stored in database by its id.
   *
   * @returns
   */
  static async findAll() {
    try {
      const query = {
        name: 'select-all-cat-facts',
        text: 'SELECT * FROM "CatFacts" ORDER BY "updatedAt" DESC;'
      };
      const { rows } = await pool.query(query);
      return rows.map((element) => {
        return new CatFact(
          element.id,
          element.user,
          element.text,
          element.source,
          element.updatedAt,
          element.type,
          element.createdAt,
          element.verified
        );
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Find a cat fact record in database by its id.
   *
   * @param {String} id
   * @returns
   */
  static async findById(id) {
    try {
      const query = {
        name: 'select-cat-fact',
        text: 'SELECT * FROM "CatFacts" WHERE "id" = $1;',
        values: [id]
      };
      const { rows } = await pool.query(query);
      return rows.map((element) => {
        return new CatFact(
          element.id,
          element.user,
          element.text,
          element.source,
          element.updatedAt,
          element.type,
          element.createdAt,
          element.verified
        );
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Insert a new cat fact to the database. This function accepts an array as argument.
   *
   * The order of items in the array should be:
   *
   * 1. `_id`
   * 1. `user`
   * 1. `text`
   * 1. `source`
   * 1. `updatedAt`
   * 1. `type`
   * 1. `createdAt`
   * 1. `status.verified`
   *
   * @param {String[]} catFact
   */
  static async create(catFact) {
    try {
      const query = {
        name: 'create-cat-fact',
        text: `
          INSERT INTO "CatFacts" (
            "id",
            "user",
            "text",
            "source",
            "updatedAt",
            "type",
            "createdAt",
            "verified"
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,
        values: catFact
      };
      await pool.query(query);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Update a cat fact record stored in database by its id. This function accepts an array as argument.
   *
   * The order of items in the array should be:
   *
   * 1. `id`
   * 1. `text`
   * 1. `source`
   * 1. `type`
   * 1. `verified`
   *
   * @param {String[]} updateCatFact
   * @returns
   */
  static async update(updateCatFact) {
    try {
      // Insert updated date to the argument
      updateCatFact.push(new Date());
      const query = {
        name: 'update-cat-fact',
        text: `
          UPDATE "CatFacts"
          SET
            "text" = $2,
            "source" = $3,
            "type" = $4,
            "verified" = $5,
            "updatedAt" = $6
          WHERE "id" = $1;
        `,
        values: updateCatFact
      };
      const { rowCount } = await pool.query(query);
      return rowCount;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Delete a cat fact record stored in database by its id.
   *
   * @param {String} id
   * @returns
   */
  static async destroy(id) {
    try {
      const query = {
        name: 'destroy-cat-fact',
        text: 'DELETE FROM "CatFacts" WHERE "id" = $1;',
        values: [id]
      };
      const { rowCount } = await pool.query(query);
      return rowCount;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default CatFact;
