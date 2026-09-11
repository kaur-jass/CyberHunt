const axios = require('axios');
const Team = require('../models/Team');
const Leaderboard = require('../models/Leaderboard');
const LevelConfig = require('../models/LevelConfig');

const LEVELS = [
  {
    level: 0,
    name: 'Ignition',
    api: process.env.LEVEL0_API
  },
  {
    level: 1,
    name: 'Trace',
    api: process.env.LEVEL1_API
  },
  {
    level: 2,
    name: 'Breach',
    api: process.env.LEVEL2_API
  },
  {
    level: 3,
    name: 'Phantom',
    api: process.env.LEVEL3_API
  },
  {
    level: 4,
    name: 'ZeroDay',
    api: process.env.LEVEL4_API
  }
];

async function evaluateTeam(team) {
  const progress = [];

  let totalMarks = 0;
  let completedLevels = 0;
  let totalTime = 0;

  for (const levelInfo of LEVELS) {
    const config = await LevelConfig.findOne({
      level: levelInfo.level
    });

    if (!config) continue;

    try {
      const response = await axios.get(
        `${levelInfo.api}/api/admin/submissions/${team.teamId}`
      );

      const submissions = response.data.submissions;

      const correct = submissions
        .filter((s) => s.isCorrect)
        .sort(
          (a, b) =>
            new Date(a.submittedAt) -
            new Date(b.submittedAt)
        )[0];

      if (!correct) continue;

      const attempts =
        submissions.filter(
          (s) =>
            new Date(s.submittedAt) <=
            new Date(correct.submittedAt)
        ).length;

      const completedAt = new Date(
        correct.submittedAt
      );

      const start = new Date(config.startTime);

      const diffMs = completedAt - start;

      const minutes = diffMs / 60000;

      let marks = 0;
      let timePenalty = 0;

      const attemptPenalty =
        (attempts - 1) * 2;

      if (minutes <= 15) {
        timePenalty = 0;
      } else if (minutes <= 25) {
        timePenalty = 2;
      } else if (minutes <= 30) {
        timePenalty = 5;
      } else {
        timePenalty = 20;
      }

      marks =
        config.maxMarks -
        attemptPenalty -
        timePenalty;

      if (minutes > 30) {
        marks = 0;
      }

      if (marks < 0) marks = 0;

      totalMarks += marks;

      completedLevels++;

      totalTime += minutes;

      progress.push({
        level: levelInfo.level,
        levelName: levelInfo.name,
        route: correct.routeCode,
        nodeId: correct.nodeId,
        completedAt,
        attempts,
        timeTaken: Number(minutes.toFixed(2)),
        attemptPenalty,
        timePenalty,
        marks
      });

    } catch (error) {
      console.log(
        `Level ${levelInfo.level} fetch failed`
      );
    }
  }

  const leader =
    team.members && team.members.length
      ? team.members[0].name
      : 'Unknown';

  await Leaderboard.findOneAndUpdate(
    {
      teamId: team.teamId
    },
    {
      teamId: team.teamId,
      teamName: team.teamName,
      leaderName: leader,
      totalMarks,
      completedLevels,
      totalTime,
      progress,
      updatedAt: new Date()
    },
    {
      upsert: true,
      new: true
    }
  );
}

async function evaluateAllTeams() {
  const teams = await Team.find();

  for (const team of teams) {
    await evaluateTeam(team);
  }
}

module.exports = {
  evaluateTeam,
  evaluateAllTeams
};