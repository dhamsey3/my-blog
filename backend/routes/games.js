const express = require('express');
const router = express.Router();

// List available games
router.get('/', (req, res, next) => {
  const { id } = req.query;
  if (id !== undefined && !/^\d+$/.test(id)) {
    return next({
      status: 400,
      errors: [{ msg: 'id must be an integer', param: 'id' }]
    });
  }

  const games = [
    { id: 1, name: 'Trivia' },
    { id: 2, name: 'Spin & Win' }
  ];

  if (id) {
    return res.json(games.filter(g => g.id === Number(id)));
  }

  res.json(games);
});

module.exports = router;
