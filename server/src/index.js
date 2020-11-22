const http = require('http');

const app = require('./app');
const sockets = require('./sockets');

const server = http.createServer(app);
sockets.init(server);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
