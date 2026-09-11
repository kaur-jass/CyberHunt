const mongoose = require('mongoose');

const level4Schema = new mongoose.Schema(
  {
    teamId: {
      type: String,
      required: true,
      index: true
    },

    routeCode: {
      type: String,
      required: true
    },

    nodeId: {
      type: String,
      default: null
    },

    flagSubmitted: {
      type: String,
      required: true
    },

    isCorrect: {
      type: Boolean,
      required: true
    },

    submittedAt: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

level4Schema.index({
  teamId: 1,
  submittedAt: 1
});

module.exports =
  mongoose.models.Level4 ||
  mongoose.model('Level4', level4Schema);