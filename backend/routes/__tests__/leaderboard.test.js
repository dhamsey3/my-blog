const request = require('supertest');
const express = require('express');
const router = require('../leaderboard');

const app = express();
app.use('/', router);

describe('GET /leaderboard', () => {
  test('returns leaderboard entries', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { user: 'Ada', points: 1200 },
      { user: 'Tunde', points: 950 }
    ]);
  });
});
