const express = require('express');

const router =
  express.Router();

const {
  refreshLeaderboard,
  editLeaderboard,
  getLeaderboard,
  getTeamLeaderboard
} = require('../controllers/leaderboardController');


router.post(
  '/refresh',
  refreshLeaderboard
);


router.put(
  '/edit/:teamId',
  editLeaderboard
);


router.get(
  '/team/:teamId',
  getTeamLeaderboard
);


router.get(
  '/',
  getLeaderboard
);


module.exports = router;