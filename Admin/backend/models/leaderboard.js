const mongoose = require('mongoose');

const progressSchema =
  new mongoose.Schema(
    {
      level: {
        type: Number,
        required: true
      },

      levelName: {
        type: String,
        required: true
      },

      route: {
        type: String,
        default: null
      },

      nodeId: {
        type: String,
        default: null
      },

      completedAt: {
        type: Date,
        default: null
      },

      attempts: {
        type: Number,
        default: 0
      },

      wrongAttempts: {
        type: Number,
        default: 0
      },

      attemptsLeft: {
        type: Number,
        default: 5
      },

      timeTaken: {
        type: Number,
        default: 0
      },

      attemptPenalty: {
        type: Number,
        default: 0
      },

      timePenalty: {
        type: Number,
        default: 0
      },

      marks: {
        type: Number,
        default: 0
      }
    },
    {
      _id: false
    }
  );


const leaderboardSchema =
  new mongoose.Schema({
    teamId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    teamName: {
      type: String,
      default: ''
    },

    leaderName: {
      type: String,
      default: ''
    },

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

    progress: {
      type: [progressSchema],
      default: []
    },

    updatedAt: {
      type: Date,
      default: Date.now
    }
  });


module.exports =
  mongoose.models.Leaderboard ||
  mongoose.model(
    'Leaderboard',
    leaderboardSchema
  );