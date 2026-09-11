const mongoose = require('mongoose');

const levelConfigSchema = new mongoose.Schema({
  level: {
    type: Number,
    unique: true,
    required: true
  },

  levelName: {
    type: String,
    required: true
  },

  startTime: {
    type: Date,
    required: true
  },

  duration: {
    type: Number,
    default: 30
  },

  maxMarks: {
    type: Number,
    default: 20
  }
});

module.exports = mongoose.model(
  'LevelConfig',
  levelConfigSchema
);