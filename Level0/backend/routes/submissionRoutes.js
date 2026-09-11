const express = require('express');
const router = express.Router();
const { submitFlag, getTeamSubmissions } = require('../controllers/submissionController');

// POST /api/submit - Submit flag using teamId
router.post('/', submitFlag);
router.get(
  '/admin/submissions/:teamId',
  getTeamSubmissions
);

module.exports = router;