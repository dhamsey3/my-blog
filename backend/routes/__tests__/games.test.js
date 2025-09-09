const request = require('supertest');
const express = require('express');
const router = require('../games');

const app = express();
app.use('/', router);

describe('GET /games', () => {
  test('returns list of games', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { id: 1, name: 'Trivia' },
      { id: 2, name: 'Spin & Win' }
    ]);
  });
});
