const mongoose = require('mongoose');

const level3Schema = new mongoose.Schema(
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

level3Schema.index({
  teamId: 1,
  submittedAt: 1
});

module.exports =
  mongoose.models.Level3 ||
  mongoose.model('Level3', level3Schema);