const Team = require('../models/Team');

// Register a new team (Admin action)
const registerTeam = async (req, res) => {
  try {
    const { teamId, teamName, teamSize, members } = req.body;

    if (!teamId || !teamName || !teamSize || !members) {
      return res.status(400).json({ error: 'All fields (teamId, teamName, teamSize, members) are required.' });
    }

    const existingTeam = await Team.findOne({ $or: [{ teamId }, { teamName }] });
    if (existingTeam) {
      return res.status(400).json({ error: 'Team ID or Team Name already exists.' });
    }

    const newTeam = await Team.create({
      teamId,
      teamName,
      teamSize,
      members
    });

    return res.status(201).json({
      success: true,
      message: 'Team registered successfully.',
      team: newTeam
    });
  } catch (error) {
    console.error('[Team Registration Error]:', error);
    return res.status(500).json({ error: 'Internal server error during team registration.' });
  }
};

// Fetch team details (Public access for everyone)
const getTeamDetails = async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await Team.findOne({ teamId });

    if (!team) {
      return res.status(404).json({ error: 'Team not found with this Team ID.' });
    }

    return res.status(200).json({
      success: true,
      team
    });
  } catch (error) {
    console.error('[Fetch Team Error]:', error);
    return res.status(500).json({ error: 'Internal server error while fetching team details.' });
  }
};

module.exports = {
  registerTeam,
  getTeamDetails
};