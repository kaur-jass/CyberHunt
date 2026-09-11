const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  teamId: { type: String, required: true },
  routeCode: { type: String, required: true }, // e.g., 'A', 'B', etc.
  flagSubmitted: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
  submittedAt: { type: Date, default: Date.now } // Timestamp for time calculations
});

module.exports = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);