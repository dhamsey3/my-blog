const request = require('supertest');
const express = require('express');
const router = require('../challenges');

const app = express();
app.use('/', router);

describe('GET /challenges', () => {
  test('returns list of challenges', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { id: 1, name: '10k Steps Challenge', reward: '₦100 airtime' }
    ]);
  });
});
