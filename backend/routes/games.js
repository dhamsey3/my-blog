const express = require('express');
const router = express.Router();

// List available games
router.get('/', (req, res) => {
  res.json([
    { id: 1, name: 'Trivia' },
    { id: 2, name: 'Spin & Win' }
  ]);
});

module.exports = router;
