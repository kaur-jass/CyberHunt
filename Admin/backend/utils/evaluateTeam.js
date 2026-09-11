const Level0 = require('../models/level0');
const Level1 = require('../models/level1');
const Level2 = require('../models/level2');
const Level3 = require('../models/level3');
const Level4 = require('../models/level4');
const Level5 = require('../models/level5');

const LevelConfig =
  require('../models/levelConfig');

const Leaderboard =
  require('../models/leaderboard');

const LEVELS = [
  {
    level: 0,
    levelName: 'IGNITION',
    Model: Level0
  },
  {
    level: 1,
    levelName: 'TRACE',
    Model: Level1
  },
  {
    level: 2,
    levelName: 'BREACH',
    Model: Level2
  },
  {
    level: 3,
    levelName: 'PHANTOM',
    Model: Level3
  },
  {
    level: 4,
    levelName: 'ZERO DAY',
    Model: Level4
  },
  {
    level: 5,
    levelName: 'NEXUS',
    Model: Level5
  }
];

const MAX_ATTEMPTS = 5;

const getTimePenalty =
  timeTaken => {

    if (
      timeTaken <=
      15 * 60
    ) {
      return 0;
    }

    if (
      timeTaken <=
      25 * 60
    ) {
      return 2;
    }

    if (
      timeTaken <=
      30 * 60
    ) {
      return 5;
    }

    return 20;
  };


const calculateLevel =
  (
    levelInfo,
    submissions,
    config
  ) => {

    const sorted =
      [...submissions]
        .filter(
          submission =>
            submission &&
            submission.submittedAt
        )
        .sort(
          (a, b) =>
            new Date(
              a.submittedAt
            ) -
            new Date(
              b.submittedAt
            )
        );

    const correctSubmission =
      sorted.find(
        submission =>
          submission.isCorrect ===
          true
      );

    if (!correctSubmission) {

      return {
        level:
          levelInfo.level,

        levelName:
          levelInfo.levelName,

        route: null,

        nodeId: null,

        completedAt: null,

        attempts:
          sorted.length,

        wrongAttempts:
          sorted.length,

        attemptsLeft:
          Math.max(
            0,
            MAX_ATTEMPTS -
              sorted.length
          ),

        timeTaken: 0,

        attemptPenalty: 0,

        timePenalty: 0,

        marks: 0
      };
    }

    const correctTime =
      new Date(
        correctSubmission.submittedAt
      );

    const attempts =
      sorted.filter(
        submission =>
          new Date(
            submission.submittedAt
          ) <= correctTime
      ).length;

    const wrongAttempts =
      Math.max(
        0,
        attempts - 1
      );

    const attemptsLeft =
      Math.max(
        0,
        MAX_ATTEMPTS -
          attempts
      );

    let timeTaken = 0;

    if (
      config &&
      config.startTime
    ) {

      const startTime =
        new Date(
          config.startTime
        );

      const difference =
        correctTime.getTime() -
        startTime.getTime();

      timeTaken =
        Math.max(
          0,
          Math.floor(
            difference / 1000
          )
        );
    }

    const baseMarks =
      Number(
        config?.maxMarks ??
        20
      );

    const timePenalty =
      getTimePenalty(
        timeTaken
      );

    const attemptPenalty =
      wrongAttempts * 2;

    const marks =
      timeTaken >
      30 * 60
        ? 0
        : Math.max(
            0,
            baseMarks -
              timePenalty -
              attemptPenalty
          );

    return {
      level:
        levelInfo.level,

      levelName:
        levelInfo.levelName,

      route:
        correctSubmission.routeCode ||
        null,

      nodeId:
        correctSubmission.nodeId ||
        correctSubmission.routeCode ||
        null,

      completedAt:
        correctSubmission.submittedAt,

      attempts,

      wrongAttempts,

      attemptsLeft,

      timeTaken,

      attemptPenalty,

      timePenalty,

      marks
    };
  };


const evaluateTeam =
  async (
    team,
    levelConfigs = null
  ) => {

    try {

      console.log(
        `\n[Evaluator] ========================================`
      );

      console.log(
        `[Evaluator] Evaluating ${team.teamId}`
      );

      console.log(
        `[Evaluator] Reading Admin DB only`
      );

      console.log(
        `[Evaluator] ========================================`
      );

      let configs =
        levelConfigs;

      if (!configs) {
        configs =
          await LevelConfig.find()
            .sort({
              level: 1
            })
            .lean();
      }

      const configMap =
        new Map(
          configs.map(config => [
            Number(config.level),
            config
          ])
        );

      /*
       * IMPORTANT:
       *
       * No fetch()
       * No axios
       * No LEVELx_API
       *
       * Data comes directly from
       * Admin MongoDB collections.
       */

      const [
        level0,
        level1,
        level2,
        level3,
        level4,
        level5
      ] = await Promise.all([

        Level0.find({
          teamId: team.teamId
        })
          .sort({
            submittedAt: 1
          })
          .lean(),

        Level1.find({
          teamId: team.teamId
        })
          .sort({
            submittedAt: 1
          })
          .lean(),

        Level2.find({
          teamId: team.teamId
        })
          .sort({
            submittedAt: 1
          })
          .lean(),

        Level3.find({
          teamId: team.teamId
        })
          .sort({
            submittedAt: 1
          })
          .lean(),

        Level4.find({
          teamId: team.teamId
        })
          .sort({
            submittedAt: 1
          })
          .lean(),

        Level5.find({
          teamId: team.teamId
        })
          .sort({
            submittedAt: 1
          })
          .lean()
      ]);

      const levelData = [
        level0,
        level1,
        level2,
        level3,
        level4,
        level5
      ];

      const progress = [];

      let totalMarks = 0;

      let completedLevels = 0;

      let totalTime = 0;

      LEVELS.forEach(
        (levelInfo, index) => {

          const result =
            calculateLevel(
              levelInfo,
              levelData[index],
              configMap.get(
                levelInfo.level
              )
            );

          progress.push(
            result
          );

          totalMarks +=
            result.marks;

          if (
            result.completedAt
          ) {
            completedLevels +=
              1;

            totalTime +=
              result.timeTaken;
          }

          console.log(
            `[Evaluator] ${team.teamId} | ${levelInfo.levelName} | Marks=${result.marks} | Attempts=${result.attempts} | Time=${result.timeTaken}s`
          );
        }
      );

      const leaderboard =
        await Leaderboard.findOneAndUpdate(
          {
            teamId:
              team.teamId
          },

          {
            teamId:
              team.teamId,

            teamName:
              team.teamName,

            leaderName:
              team.members?.[0]
                ?.name || '',

            totalMarks,

            completedLevels,

            totalTime,

            progress,

            updatedAt:
              new Date()
          },

          {
            new: true,

            upsert: true,

            runValidators: true,

            setDefaultsOnInsert:
              true
          }
        );

      console.log(
        `[Evaluator] ${team.teamId} SAVED => ${totalMarks}/120`
      );

      return {
        success: true,

        teamId:
          team.teamId,

        teamName:
          team.teamName,

        totalMarks,

        completedLevels,

        totalTime,

        progress,

        leaderboard
      };

    } catch (error) {

      console.error(
        `[Evaluator] Failed for ${team.teamId}:`,
        error
      );

      return {
        success: false,

        teamId:
          team.teamId,

        teamName:
          team.teamName,

        error:
          error.message ||
          'Evaluation failed.'
      };
    }
  };


const evaluateAllTeams =
  async teams => {

    let teamList =
      teams;

    if (!teamList) {

      const Team =
        require('../models/Team');

      teamList =
        await Team.find()
          .sort({
            teamId: 1
          })
          .lean();
    }

    const configs =
      await LevelConfig.find()
        .sort({
          level: 1
        })
        .lean();

    const results = [];

    for (
      const team of teamList
    ) {

      const result =
        await evaluateTeam(
          team,
          configs
        );

      results.push(
        result
      );
    }

    return results;
  };


module.exports = {
  LEVELS,
  evaluateTeam,
  evaluateAllTeams
};