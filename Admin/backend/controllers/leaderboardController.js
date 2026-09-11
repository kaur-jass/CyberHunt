const Leaderboard =
  require('../models/leaderboard');

const Team =
  require('../models/Team');

const {
  evaluateTeam,
  evaluateAllTeams
} = require('../utils/evaluateTeam');

const {
  syncTeamLevelData,
  syncAllTeamsLevelData
} = require('../utils/syncLevelData');


const refreshLeaderboard =
  async (req, res) => {

    try {

      console.log(
        '\n[Leaderboard] FULL REFRESH STARTED'
      );

      const teams =
        await Team.find()
          .sort({
            teamId: 1
          })
          .lean();

      /*
       * STEP 1
       * Sync all level APIs into
       * Admin level collections.
       */

      console.log(
        '[Leaderboard] Step 1: Syncing level data...'
      );

      const syncResults =
        await syncAllTeamsLevelData(
          teams
        );

      /*
       * STEP 2
       * Evaluate ONLY from Admin DB.
       */

      console.log(
        '[Leaderboard] Step 2: Evaluating teams from Admin DB...'
      );

      const results =
        await evaluateAllTeams(
          teams
        );

      const successful =
        results.filter(
          item =>
            item.success === true
        );

      const failed =
        results.filter(
          item =>
            item.success === false
        );

      const leaderboard =
        await Leaderboard.find()
          .sort({
            totalMarks: -1,
            completedLevels: -1,
            totalTime: 1
          })
          .lean();

      console.log(
        '[Leaderboard] FULL REFRESH COMPLETED'
      );

      return res.status(200).json({
        success: true,

        message:
          'Leaderboard refreshed successfully.',

        teamsEvaluated:
          results.length,

        successful:
          successful.length,

        failed:
          failed.length,

        syncResults,

        results,

        leaderboard
      });

    } catch (error) {

      console.error(
        '[Leaderboard Refresh Error]:',
        error
      );

      return res.status(500).json({
        success: false,

        error:
          error.message ||
          'Failed to refresh leaderboard.'
      });
    }
  };


const editLeaderboard =
  async (req, res) => {

    try {

      const {
        teamId
      } = req.params;

      if (!teamId) {

        return res.status(400).json({
          success: false,
          error:
            'Team ID is required.'
        });
      }

      console.log(
        `\n[Leaderboard] RE-EVALUATION STARTED: ${teamId}`
      );

      const team =
        await Team.findOne({
          teamId
        }).lean();

      if (!team) {

        return res.status(404).json({
          success: false,
          error:
            'Team not found in database.'
        });
      }

      /*
       * STEP 1
       * Synchronize latest submissions
       * from all six level APIs.
       */

      const syncResult =
        await syncTeamLevelData(
          teamId
        );

      /*
       * STEP 2
       * Evaluate from Admin DB.
       */

      const result =
        await evaluateTeam(
          team
        );

      if (
        !result ||
        result.success === false
      ) {

        return res.status(500).json({
          success: false,

          error:
            result?.error ||
            'Failed to evaluate team.',

          syncResult
        });
      }

      const updatedLeaderboard =
        await Leaderboard.findOne({
          teamId
        }).lean();

      console.log(
        `[Leaderboard] ${teamId} => ${result.totalMarks}/120`
      );

      return res.status(200).json({

        success: true,

        message:
          `Leaderboard updated for ${teamId}.`,

        teamId,

        teamName:
          team.teamName,

        totalMarks:
          result.totalMarks,

        completedLevels:
          result.completedLevels,

        totalTime:
          result.totalTime,

        progress:
          result.progress,

        syncResult,

        leaderboard:
          updatedLeaderboard
      });

    } catch (error) {

      console.error(
        `[Leaderboard Edit Error - ${req.params.teamId}]:`,
        error
      );

      return res.status(500).json({
        success: false,

        error:
          error.message ||
          'Failed to re-evaluate leaderboard for team.'
      });
    }
  };


const getLeaderboard =
  async (req, res) => {

    try {

      const leaderboard =
        await Leaderboard.find()
          .sort({
            totalMarks: -1,
            completedLevels: -1,
            totalTime: 1
          })
          .lean();

      return res.status(200).json({
        success: true,

        count:
          leaderboard.length,

        leaderboard
      });

    } catch (error) {

      console.error(
        '[Get Leaderboard Error]:',
        error
      );

      return res.status(500).json({
        success: false,

        error:
          error.message ||
          'Failed to fetch leaderboard.'
      });
    }
  };


const getTeamLeaderboard =
  async (req, res) => {

    try {

      const {
        teamId
      } = req.params;

      if (!teamId) {

        return res.status(400).json({
          success: false,
          error:
            'Team ID is required.'
        });
      }

      const team =
        await Leaderboard.findOne({
          teamId
        }).lean();

      if (!team) {

        return res.status(404).json({
          success: false,
          error:
            'Team not found in leaderboard.'
        });
      }

      return res.status(200).json({
        success: true,
        team
      });

    } catch (error) {

      console.error(
        '[Get Team Leaderboard Error]:',
        error
      );

      return res.status(500).json({
        success: false,

        error:
          error.message ||
          'Failed to fetch team leaderboard.'
      });
    }
  };


module.exports = {
  refreshLeaderboard,
  editLeaderboard,
  getLeaderboard,
  getTeamLeaderboard
};