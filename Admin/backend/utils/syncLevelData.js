const Level0 = require('../models/level0');
const Level1 = require('../models/level1');
const Level2 = require('../models/level2');
const Level3 = require('../models/level3');
const Level4 = require('../models/level4');
const Level5 = require('../models/level5');

const LEVELS = [
  {
    level: 0,
    name: 'IGNITION',
    apiEnv: 'LEVEL0_API',
    Model: Level0
  },
  {
    level: 1,
    name: 'TRACE',
    apiEnv: 'LEVEL1_API',
    Model: Level1
  },
  {
    level: 2,
    name: 'BREACH',
    apiEnv: 'LEVEL2_API',
    Model: Level2
  },
  {
    level: 3,
    name: 'PHANTOM',
    apiEnv: 'LEVEL3_API',
    Model: Level3
  },
  {
    level: 4,
    name: 'ZERO DAY',
    apiEnv: 'LEVEL4_API',
    Model: Level4
  },
  {
    level: 5,
    name: 'NEXUS',
    apiEnv: 'LEVEL5_API',
    Model: Level5
  }
];

const normalizeSubmissions = data => {
  if (Array.isArray(data)) {
    return data;
  }

  if (
    data &&
    Array.isArray(data.submissions)
  ) {
    return data.submissions;
  }

  if (
    data &&
    data.data &&
    Array.isArray(data.data.submissions)
  ) {
    return data.data.submissions;
  }

  return [];
};

const syncSingleLevel = async (
  teamId,
  levelInfo
) => {
  const apiUrl =
    process.env[levelInfo.apiEnv];

  if (!apiUrl) {
    throw new Error(
      `${levelInfo.apiEnv} is not configured.`
    );
  }

  const url =
    `${apiUrl}/api/submit/admin/submissions/${teamId}`;

  console.log(
    `[Sync] Fetching ${levelInfo.name} for ${teamId}`
  );

  const response =
    await fetch(url);

  if (!response.ok) {
    throw new Error(
      `${levelInfo.name} API returned HTTP ${response.status}`
    );
  }

  const data =
    await response.json();

  const submissions =
    normalizeSubmissions(data);

  const Model =
    levelInfo.Model;

  await Model.deleteMany({
    teamId
  });

  if (submissions.length === 0) {
    console.log(
      `[Sync] ${teamId} - ${levelInfo.name}: 0 submissions`
    );

    return {
      level: levelInfo.level,
      levelName: levelInfo.name,
      count: 0
    };
  }

  const documents =
    submissions
      .filter(
        submission =>
          submission &&
          submission.teamId &&
          submission.submittedAt
      )
      .map(submission => ({
        teamId:
          submission.teamId,

        routeCode:
          String(
            submission.routeCode || 'A'
          ).toUpperCase(),

        nodeId:
          submission.nodeId ||
          null,

        flagSubmitted:
          submission.flagSubmitted ||
          '',

        isCorrect:
          submission.isCorrect === true ||
          submission.isCorrect === 'true',

        submittedAt:
          new Date(
            submission.submittedAt
          )
      }));

  if (documents.length > 0) {
    await Model.insertMany(
      documents
    );
  }

  console.log(
    `[Sync] ${teamId} - ${levelInfo.name}: ${documents.length} submissions stored`
  );

  return {
    level: levelInfo.level,
    levelName: levelInfo.name,
    count: documents.length
  };
};

const syncTeamLevelData = async (
  teamId
) => {
  console.log(
    `\n[Sync] ========================================`
  );

  console.log(
    `[Sync] Synchronizing ${teamId}`
  );

  console.log(
    `[Sync] ========================================`
  );

  const results =
    await Promise.allSettled(
      LEVELS.map(level =>
        syncSingleLevel(
          teamId,
          level
        )
      )
    );

  const output =
    results.map(
      (result, index) => {

        if (
          result.status ===
          'fulfilled'
        ) {
          return {
            success: true,
            ...result.value
          };
        }

        return {
          success: false,
          level:
            LEVELS[index].level,
          levelName:
            LEVELS[index].name,
          count: 0,
          error:
            result.reason?.message ||
            'Sync failed'
        };
      }
    );

  console.log(
    `[Sync] Completed synchronization for ${teamId}`
  );

  return output;
};

const syncAllTeamsLevelData =
  async teams => {

    const results =
      await Promise.all(
        teams.map(team =>
          syncTeamLevelData(
            team.teamId
          )
        )
      );

    return results;
  };

module.exports = {
  LEVELS,
  syncTeamLevelData,
  syncAllTeamsLevelData
};