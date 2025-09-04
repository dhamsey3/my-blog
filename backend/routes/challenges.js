const express = require('express');
const router = express.Router();

// Active challenges
router.get('/', (req, res) => {
  res.json([
    { id: 1, name: '10k Steps Challenge', reward: '₦100 airtime' }
  ]);
});

module.exports = router;
