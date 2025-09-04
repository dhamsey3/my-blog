const express = require('express');
const router = express.Router();

// Daily prediction stub
router.get('/', (req, res) => {
  res.json([
    { id: 1, question: 'Will it rain in Lagos today?' }
  ]);
});

module.exports = router;
