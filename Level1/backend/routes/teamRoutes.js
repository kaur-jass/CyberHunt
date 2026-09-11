const express = require('express');
const router = express.Router();
const { registerTeam, getTeamDetails } = require('../controllers/teamController');

// POST /api/teams/register - Admin registration route
router.post('/register', registerTeam);

// GET /api/teams/:teamId - Public route to fetch team details
router.get('/:teamId', getTeamDetails);

module.exports = router;