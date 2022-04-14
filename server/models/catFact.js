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
        text: 'SELECT * FROM "CatFacts";'
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
}

export default CatFact;
