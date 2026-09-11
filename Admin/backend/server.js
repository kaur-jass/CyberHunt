const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const leaderboardRoutes =
  require('./routes/leaderboardRoutes');

const teamRoutes =
  require('./routes/teamRoutes');

const levelRoutes =
  require('./routes/levelRoutes');


const app = express();


/* Middleware */

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(
  express.json()
);

app.use(
  express.urlencoded({
    extended: true
  })
);


/* MongoDB */

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {

    console.log(
      '[Admin Backend] MongoDB Connected Successfully'
    );

  })
  .catch((error) => {

    console.error(
      '[Admin Backend] MongoDB Connection Error:',
      error
    );

    process.exit(1);

  });


/* Routes */

app.use(
  '/api/leaderboard',
  leaderboardRoutes
);

app.use(
  '/api/teams',
  teamRoutes
);

app.use(
  '/api/levels',
  levelRoutes
);


/* Health Check */

app.get(
  '/',
  (req, res) => {

    res.status(200).json({
      success: true,
      service: 'Cyber Hunt Admin Backend',
      status: 'ONLINE'
    });

  }
);


/* 404 Handler */

app.use(
  (req, res) => {

    res.status(404).json({
      success: false,
      error: 'API endpoint not found.',
      path: req.originalUrl
    });

  }
);


/* Global Error Handler */

app.use(
  (error, req, res, next) => {

    console.error(
      '[Server Error]:',
      error
    );


    if (
      error.code === 'LIMIT_FILE_SIZE'
    ) {

      return res.status(400).json({
        success: false,
        error:
          'File size cannot exceed 10 MB.'
      });

    }


    if (
      error.message &&
      error.message.includes(
        'Only Excel files'
      )
    ) {

      return res.status(400).json({
        success: false,
        error: error.message
      });

    }


    return res.status(
      error.status || 500
    ).json({

      success: false,

      error:
        error.message ||
        'Internal server error.'

    });

  }
);


/* Start Server */

const PORT =
  process.env.PORT || 6000;


app.listen(
  PORT,
  () => {

    console.log(
      `[Admin Backend] Server running on port ${PORT}`
    );

    console.log(
      `[Admin Backend] http://localhost:${PORT}`
    );

  }
);