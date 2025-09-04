const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const gamesRouter = require('./routes/games');
const predictionsRouter = require('./routes/predictions');
const challengesRouter = require('./routes/challenges');
const leaderboardRouter = require('./routes/leaderboard');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/games', gamesRouter);
app.use('/api/predictions', predictionsRouter);
app.use('/api/challenges', challengesRouter);
app.use('/api/leaderboard', leaderboardRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
