const express = require('express');
const multer = require('multer');

const router = express.Router();

const {
  registerTeam,
  getTeamDetails,
  getAllTeams,
  uploadTeamsExcel
} = require('../controllers/teamController');


const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 10 * 1024 * 1024
  },

  fileFilter: (req, file, cb) => {

    const fileName =
      file.originalname.toLowerCase();

    if (
      fileName.endsWith('.xlsx') ||
      fileName.endsWith('.xls')
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          'Only Excel files (.xlsx or .xls) are allowed.'
        )
      );
    }

  }
});


/*
 * Register one team manually
 * POST /api/teams/register
 */
router.post(
  '/register',
  registerTeam
);


/*
 * Register multiple teams using Excel
 * POST /api/teams/upload-excel
 */
router.post(
  '/upload-excel',
  upload.single('file'),
  uploadTeamsExcel
);


/*
 * Fetch all registered teams
 * GET /api/teams/all
 */
router.get(
  '/all',
  getAllTeams
);


/*
 * Fetch one team
 * GET /api/teams/:teamId
 */
router.get(
  '/:teamId',
  getTeamDetails
);


module.exports = router;