const express = require('express');
const router = express.Router();

// Hustle leaderboard placeholder
router.get('/', (req, res) => {
  res.json([
    { user: 'Ada', points: 1200 },
    { user: 'Tunde', points: 950 }
  ]);
});

module.exports = router;
