const socketIO = require('socket.io');

const clients = {};

// we create this function because we need to pass server variable from
// outside this file
function init(server) {
  // setup socket server
  const io = socketIO(server, {
    cors:true,
    origins:["http://127.0.0.1:1234"],
   });
  console.log('Socket server is listening for connections!');
  // on connection with each client
  io.on('connection', (socket) => {
    console.log(`${socket.id} connected`);
    socket.emit('message-already-connected', clients);
    if (!clients[socket.id]) {
      clients[socket.id] = true;
    }
    io.emit('message-client-connected', socket.id);

    socket.on('disconnect', () => {
      console.log(`${socket.id} disconnected`);
      io.emit('message-client-disconnected', socket.id);
      delete clients[socket.id];
      console.log(clients);
    });
    console.log(clients);
  });
}

module.exports = {
  init,
};