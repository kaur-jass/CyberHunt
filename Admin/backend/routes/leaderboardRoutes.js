const express = require('express');

const router = express.Router();

const {
  refreshLeaderboard,
  getLeaderboard
} = require('../controllers/leaderboardController');

router.post('/refresh', refreshLeaderboard);

router.get('/', getLeaderboard);

module.exports = router;