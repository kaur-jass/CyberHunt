const LevelConfig = require('../models/LevelConfig');

const setLevelTime = async (req, res) => {
  try {
    const {
      level,
      levelName,
      startTime
    } = req.body;

    const config =
      await LevelConfig.findOneAndUpdate(
        { level },
        {
          level,
          levelName,
          startTime
        },
        {
          upsert: true,
          new: true
        }
      );

    res.json({
      success: true,
      config
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const getLevels = async (req, res) => {
  const levels =
    await LevelConfig.find().sort({
      level: 1
    });

  res.json(levels);
};

module.exports = {
  setLevelTime,
  getLevels
};