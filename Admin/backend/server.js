const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const leaderboardRoutes = require('./routes/leaderboardRoutes');
const teamRoutes = require('./routes/teamRoutes');
const levelRoutes = require('./routes/levelRoutes');

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Admin MongoDB Connected');
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/levels', levelRoutes);

app.get('/', (req, res) => {
  res.send('Admin Backend Running');
});

app.listen(
  process.env.PORT || 6000,
  () => {
    console.log('Admin Server Running');
  }
);