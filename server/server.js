const path = require('path');
const express = require('express');
require('./config/dotenv');

const guidesRouter = require('./routes/guides');

const app = express();
const PORT = process.env.PORT || 3000;
const clientPath = path.join(__dirname, '../client/src');

app.use(express.static(clientPath));
app.use('/api/guides', guidesRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Ultimate Git Guide is running at http://localhost:${PORT}`);
});
