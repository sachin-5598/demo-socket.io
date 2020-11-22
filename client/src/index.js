import io from 'socket.io-client';

const API_URL = 'http://localhost:5050';

const socket = io.connect(API_URL);

const users = {};

function createUserBar(id) {
  const container = document.createElement('div');
  const alert = document.createElement('div');
  alert.className = "alert alert-dismissible alert-primary";
  const strong = document.createElement('strong');
  strong.textContent = id;
  alert.appendChild(strong);
  container.appendChild(alert);
  users[id] = container;
  return container;
}

// after the client is connected to the server
socket.on('connect', () => {
  console.log('Connected to the server');
});

socket.on('message-client-connected', (id) => {
  console.log(`Client with id : ${id} is connected`);
  if (socket.id !== id) {
    let user = users[id];
    // <div class="container">
    //   <div class="alert alert-dismissible alert-primary">
    //     <strong>Oh snap!</strong>
    //   </div>
    // </div>
    if (!user) {
      user = createUserBar(id);
      document.body.appendChild(user);
    }    
    // user.children[0].children[0].textContent = id;
  }
});

socket.on('message-already-connected', (message) => {
  console.log(message);
  for (const id in message) {
    // message[id] = 'xxx';
    if (socket.id !== id) {
      let user = users[id];
      if (!user) {
        user = createUserBar(id);
        document.body.appendChild(user);
      }    
    }
  }
});

socket.on('message-client-disconnected', (id) => {
  console.log(`Client with id : ${id} was disconnected`);
  if (users[id]) {
    document.body.removeChild(users[id]);
    delete users[id];
  }
  console.log(users);
});
