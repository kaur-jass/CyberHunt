const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema(
  {
    level: Number,

    levelName: String,

    route: String,

    nodeId: String,

    completedAt: Date,

    attempts: Number,

    timeTaken: Number,

    attemptPenalty: Number,

    timePenalty: Number,

    marks: Number
  },
  { _id: false }
);

const leaderboardSchema = new mongoose.Schema({
  teamId: {
    type: String,
    required: true,
    unique: true
  },

  teamName: String,

  leaderName: String,

  totalMarks: {
    type: Number,
    default: 0
  },

  completedLevels: {
    type: Number,
    default: 0
  },

  totalTime: {
    type: Number,
    default: 0
  },

  progress: [progressSchema],

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  'Leaderboard',
  leaderboardSchema
);