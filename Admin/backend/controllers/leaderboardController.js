const Leaderboard = require('../models/Leaderboard');
const { evaluateAllTeams } = require('../utils/evaluateTeam');

const refreshLeaderboard = async (req, res) => {
  try {
    await evaluateAllTeams();

    res.json({
      success: true,
      message: 'Leaderboard refreshed successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const teams = await Leaderboard.find().sort({
      totalMarks: -1,
      totalTime: 1
    });

    res.json({
      success: true,
      leaderboard: teams
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  refreshLeaderboard,
  getLeaderboard
};