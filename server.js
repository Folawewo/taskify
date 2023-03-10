const app = require('./app');
const http = require('http');
require('./services/mongo')
require('dotenv').config();

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
