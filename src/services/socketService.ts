import { io, Socket } from 'socket.io-client';

let socket: Socket;

function initSocketConnection() {
  socket = io(SOCKET_URL);
  socket.on('connect', () => {
    console.log('Socket connection established, socket id', socket.id);
  });
}

export default initSocketConnection;
