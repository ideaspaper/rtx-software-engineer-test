import app from './../index.js';
import supertest from 'supertest';
import pool from './../database/connection.js';

const testRecords = [
  {
    id: '1',
    user: 'user1',
    text: 'text1',
    source: 'source1',
    type: 'type1',
    verified: true
  },
  {
    id: '2',
    user: 'user2',
    text: 'text2',
    source: 'source2',
    type: 'type2',
    verified: false
  },
  {
    id: '3',
    user: 'user3',
    text: 'text3',
    source: 'source3',
    type: 'type3',
    verified: true
  },
  {
    id: '4',
    user: 'user4',
    text: 'text4',
    source: 'source4',
    type: 'type4',
    verified: false
  },
  {
    id: '5',
    user: 'user5',
    text: 'text5',
    source: 'source5',
    type: 'type5',
    verified: true
  }
];

beforeAll(async () => {
  const deleteCatFacts = {
    name: 'delete-cat-facts',
    text: 'DELETE FROM "CatFacts";'
  };
  await pool.query(deleteCatFacts);
  const testRecordsString = testRecords
    .map((element) => {
      return `(
        '${element.id}', '${element.user}', '${element.text}',
        '${element.source}', $1, '${element.type}', $1, '${element.verified}'
      )`;
    })
    .join();
  const createCatFacts = {
    name: 'create-cat-facts',
    text: `
      INSERT INTO "CatFacts" ("id", "user", "text", "source", "updatedAt", "type", "createdAt", "verified")
      VALUES ${testRecordsString};
    `,
    values: [new Date()]
  };
  await pool.query(createCatFacts);
});

describe('GET /catfacts', () => {
  test('Successful response status should be 200', async () => {
    const { body } = await supertest(app).get('/catfacts').expect(200);
    expect(body.length).toBe(5);
    body.forEach((element, index) => {
      expect(element.id).toBe(testRecords[index].id);
      expect(element.user).toBe(testRecords[index].user);
      expect(element.text).toBe(testRecords[index].text);
      expect(element.source).toBe(testRecords[index].source);
      expect(element.type).toBe(testRecords[index].type);
      expect(element.verified).toBe(testRecords[index].verified);
    });
  });
});

describe('GET /catfacts/:id', () => {
  test('Successful response status should be 200', async () => {
    const { body } = await supertest(app).get(`/catfacts/${3}`).expect(200);
    expect(body.id).toBe('3');
    expect(body.user).toBe(testRecords[2].user);
    expect(body.text).toBe(testRecords[2].text);
    expect(body.source).toBe(testRecords[2].source);
    expect(body.type).toBe(testRecords[2].type);
    expect(body.verified).toBe(testRecords[2].verified);
  });

  test('Data not found response status should be 404', async () => {
    const { body } = await supertest(app).get(`/catfacts/${99}`).expect(404);
    expect(body.message).toBe('not found');
  });
});

describe('DELETE /catfacts/:id', () => {
  test('Successful response status should be 200', async () => {
    const createCatFact6 = {
      name: 'create-cat-fact-6',
      text: `
        INSERT INTO "CatFacts" ("id", "user", "text", "source", "updatedAt", "type", "createdAt", "verified")
        VALUES ('6', 'user6', 'text6', 'source1', $1, 'type6', $1, 'true');
      `,
      values: [new Date()]
    };
    await pool.query(createCatFact6);
    const { body } = await supertest(app).delete(`/catfacts/${6}`).expect(200);
    expect(body.message).toBe('cat fact has been deleted');
  });

  test('Data not found response status should be 404', async () => {
    const { body } = await supertest(app).delete(`/catfacts/${99}`).expect(404);
    expect(body.message).toBe('not found');
  });
});

describe('PUT /catfacts/:id', () => {
  test('Successful response status should be 200', async () => {
    const createCatFact8 = {
      name: 'create-cat-fact-8',
      text: `
        INSERT INTO "CatFacts" ("id", "user", "text", "source", "updatedAt", "type", "createdAt", "verified")
        VALUES ('8', 'user8', 'text8', 'source8', $1, 'type8', $1, 'true');
      `,
      values: [new Date()]
    };
    await pool.query(createCatFact8);
    const updateCatFact8 = {
      text: 'text8update',
      source: 'source8update',
      type: 'source8type',
      verified: false
    };
    const { body } = await supertest(app).put(`/catfacts/${8}`)
      .set('Content-Type', 'application/json')
      .send(updateCatFact8)
      .expect(200);
    expect(body.message).toBe('cat fact has been updated');
    const readCatFact8 = {
      name: 'read-cat-fact-8',
      text: `SELECT * FROM "CatFacts" WHERE "id" = '8';`
    };
    const { rows } = await pool.query(readCatFact8);
    expect(rows[0].text).toBe(updateCatFact8.text);
    expect(rows[0].source).toBe(updateCatFact8.source);
    expect(rows[0].type).toBe(updateCatFact8.type);
    expect(rows[0].verified).toBe(updateCatFact8.verified);
  });

  test('Data not found response status should be 404', async () => {
    const updateCatFact99 = {
      text: 'text99update',
      source: 'source99update',
      type: 'source99type',
      verified: false
    };
    const { body } = await supertest(app).put(`/catfacts/${99}`)
      .set('Content-Type', 'application/json')
      .send(updateCatFact99)
      .expect(404);
    expect(body.message).toBe('not found');
  });
});
