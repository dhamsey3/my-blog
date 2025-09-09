const express = require('express');
const router = express.Router();

// Hustle leaderboard placeholder
router.get('/', (req, res, next) => {
  const { limit } = req.query;
  if (limit !== undefined && (!/^\d+$/.test(limit) || Number(limit) < 1)) {
    return next({
      status: 400,
      errors: [{ msg: 'limit must be a positive integer', param: 'limit' }]
    });
  }

  let leaders = [
    { user: 'Ada', points: 1200 },
    { user: 'Tunde', points: 950 }
  ];

  if (limit) {
    leaders = leaders.slice(0, Number(limit));
  }

  res.json(leaders);
});

module.exports = router;
