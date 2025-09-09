const express = require('express');
const router = express.Router();

// Active challenges
router.get('/', (req, res, next) => {
  const { active } = req.query;
  if (active !== undefined && !['true', 'false'].includes(active)) {
    return next({
      status: 400,
      errors: [{ msg: 'active must be boolean', param: 'active' }]
    });
  }

  res.json([
    { id: 1, name: '10k Steps Challenge', reward: '₦100 airtime' }
  ]);
});

module.exports = router;
