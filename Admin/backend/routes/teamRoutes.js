const express = require('express');

const router = express.Router();

const {
  registerTeam,
  getTeamDetails,
  getAllTeams
} = require('../controllers/teamController');


router.post(
  '/register',
  registerTeam
);


router.get(
  '/all',
  getAllTeams
);


router.get(
  '/:teamId',
  getTeamDetails
);


module.exports = router;