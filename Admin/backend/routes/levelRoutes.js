const express = require('express');

const router = express.Router();

const {
  setLevelTime,
  getLevels
} = require('../controllers/levelController');

router.post('/set-time', setLevelTime);

router.get('/', getLevels);

module.exports = router;