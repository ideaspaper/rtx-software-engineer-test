import pool from './../database/connection.js';

class CatFact {
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

  static async update(updateCatFact) {
    try {
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
