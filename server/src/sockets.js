const socketIO = require('socket.io');

// we create this function because we need to pass server variable from
// outside this file
function init(server) {
  // setup socket server
  const io = socketIO(server);
  console.log('Socket server is listening for connections!');
  // on connection with each client
  io.on('connection', (socket) => {
    console.log(`${socket} connected`);
  });
}

module.exports = {
  init,
};