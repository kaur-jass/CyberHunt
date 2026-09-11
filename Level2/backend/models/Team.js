const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  rollNo: { type: String, required: true },
  mobileNo: { type: String, required: true },
  course: { type: String, required: true },
  year: { type: String, required: true },
  branch: { type: String, required: true }
}, { _id: false });

const teamSchema = new mongoose.Schema({
  teamId: { type: String, required: true, unique: true }, // e.g., TEAM-001
  teamName: { type: String, required: true},
  teamSize: { type: Number, required: true },
  members: [memberSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Team || mongoose.model('Team', teamSchema);