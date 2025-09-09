const request = require('supertest');
const express = require('express');
const router = require('../predictions');

const app = express();
app.use('/', router);

describe('GET /predictions', () => {
  test('returns list of predictions', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { id: 1, question: 'Will it rain in Lagos today?' }
    ]);
  });
});
