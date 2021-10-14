import { io, Socket } from 'socket.io-client';
import { socketStatusMap } from '~/constants';
import { SocketStatus } from '~/types';

let socket: Socket;

function initSocketConnection(
  setSocketConnected: React.Dispatch<React.SetStateAction<SocketStatus>>,
) {
  socket = io(SOCKET_URL);
  socket.on('connect', () => {
    console.log('Socket connection established, socket id', socket.id);
    setSocketConnected(socketStatusMap.CONNECTED);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected, socket id', socket.id);
    setSocketConnected(socketStatusMap.DISCONNECTED);
  });
}

export default initSocketConnection;
