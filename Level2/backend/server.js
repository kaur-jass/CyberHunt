const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const teamRoutes = require('./routes/teamRoutes');
const submissionRoutes = require('./routes/submissionRoutes');

const app = express();

app.use(express.json());
app.use(cors());

// Reliable IPv4 MongoDB Connection String
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000
})
  .then(() => console.log('[CTF Backend] MongoDB Connected Successfully'))
  .catch((err) => {
    console.error('[Database Connection Error]:', err);
    process.exit(1);
  });

// Mount Routes
app.use('/api/teams', teamRoutes);
app.use('/api/submit', submissionRoutes);

app.get('/', (req, res) => {
  res.json({ service: 'CTF Level Backend Service', status: 'ONLINE' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[CTF Backend] Server running on port ${PORT}`);
});

module.exports = app;