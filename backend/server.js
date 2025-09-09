const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const gamesRouter = require('./routes/games');
const predictionsRouter = require('./routes/predictions');
const challengesRouter = require('./routes/challenges');
const leaderboardRouter = require('./routes/leaderboard');

const app = express();

// Allow only specific origins via CORS
const allowedOrigins = [
  'http://localhost:3000'
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    }
  })
);

app.use(bodyParser.json());

app.use('/api/games', gamesRouter);
app.use('/api/predictions', predictionsRouter);
app.use('/api/challenges', challengesRouter);
app.use('/api/leaderboard', leaderboardRouter);

// Centralized error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (err.errors) {
    return res.status(status).json({ errors: err.errors });
  }
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
