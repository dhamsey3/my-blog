const express = require('express');
const router = express.Router();

// Daily prediction stub
router.get('/', (req, res, next) => {
  const { date } = req.query;
  if (date !== undefined && isNaN(Date.parse(date))) {
    return next({
      status: 400,
      errors: [{ msg: 'date must be ISO8601', param: 'date' }]
    });
  }

  res.json([
    { id: 1, question: 'Will it rain in Lagos today?' }
  ]);
});

module.exports = router;
