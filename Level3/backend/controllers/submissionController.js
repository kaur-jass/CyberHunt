const Team = require('../models/Team');
const Submission = require('../models/submission');

const submitFlag = async (req, res) => {
  try {
    const { teamId, flag, routeCode = 'A' } = req.body;

    if (!teamId || !flag) {
      return res.status(400).json({ error: 'teamId and flag are required.' });
    }

    const upperRoute = routeCode.toUpperCase();

    // 1. Find the team using teamId in the Team collection
    const team = await Team.findOne({ teamId });
    if (!team) {
      return res.status(404).json({ error: 'Team ID not found in database. Please register first.' });
    }

    // 2. Count prior submissions for this team on this specific route (Max 5 attempts check)
    const priorAttemptsCount = await Submission.countDocuments({ teamId, routeCode: upperRoute });
    if (priorAttemptsCount >= 5) {
      return res.status(429).json({ 
        error: 'Maximum submission limit (5 attempts) reached for this route. Access locked.' 
      });
    }

    // Check if already solved successfully
    const alreadySolved = await Submission.findOne({ teamId, routeCode: upperRoute, isCorrect: true });
    if (alreadySolved) {
      const nextLocationHint = process.env[`HINT_ROUTE_${upperRoute}`] || 'Proceed to the next checkpoint.';
      return res.status(200).json({
        success: true,
        message: `Route ${upperRoute} was already completed successfully by your team.`,
        nextLocation: nextLocationHint
      });
    }

    // 3. Fetch expected flag from .env
    const expectedFlag = process.env[`FLAG_ROUTE_${upperRoute}`];
    const nextLocationHint = process.env[`HINT_ROUTE_${upperRoute}`] || 'Proceed to the next checkpoint.';

    if (!expectedFlag) {
      return res.status(500).json({ error: 'Server configuration error: Flag for this route is not defined.' });
    }

    const isCorrect = (flag.trim() === expectedFlag.trim());

    // 4. Save submission record with current timestamp
    await Submission.create({
      teamId,
      routeCode: upperRoute,
      flagSubmitted: flag.trim(),
      isCorrect,
      submittedAt: new Date() // Tracks exact timestamp for time calculation
    });

    if (!isCorrect) {
      const remainingAttempts = 5 - (priorAttemptsCount + 1);
      return res.status(400).json({ 
        error: `Incorrect flag. ${remainingAttempts} attempt(s) remaining.` 
      });
    }

    // 5. Success response
    return res.status(200).json({
      success: true,
      message: `Access Granted! Route ${upperRoute} verified successfully.`,
      nextLocation: nextLocationHint
    });

  } catch (error) {
    console.error('[Submission Error]:', error);
    return res.status(500).json({ error: 'Internal server error during flag verification.' });
  }
};

const getTeamSubmissions = async (req, res) => {
  try {
    const { teamId } = req.params;

    const submissions =
      await Submission.find({
        teamId
      }).sort({
        submittedAt: 1
      });

    res.json({
      success: true,
      submissions
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  submitFlag,
  getTeamSubmissions
};