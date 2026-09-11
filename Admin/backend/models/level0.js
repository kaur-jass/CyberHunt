const mongoose = require('mongoose');

const level0Schema = new mongoose.Schema(
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

level0Schema.index({
  teamId: 1,
  submittedAt: 1
});

module.exports =
  mongoose.models.Level0 ||
  mongoose.model('Level0', level0Schema);