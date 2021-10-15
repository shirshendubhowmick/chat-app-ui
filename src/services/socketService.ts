import { io, Socket } from 'socket.io-client';
import { socketStatusMap } from '~/constants';
import { SocketStatus } from '~/types';

let socket: Socket;

interface AcknowledgementMessage {
  success: boolean;
  timestamp: Date;
  error?: string;
}

function initSocketConnection(
  setSocketConnected: React.Dispatch<React.SetStateAction<SocketStatus>>,
) {
  socket = io(SOCKET_URL, {
    withCredentials: true,
  });
  socket.on('connect', () => {
    console.log('Socket connection established, socket id', socket.id);
    setSocketConnected(socketStatusMap.CONNECTED);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected, socket id', socket.id);
    setSocketConnected(socketStatusMap.DISCONNECTED);
  });
}

function sendMessage(text: string) {
  socket.emit(
    'message',
    {
      text,
    },
    (ack: AcknowledgementMessage) => {
      console.log(ack);
    },
  );
}

export default initSocketConnection;

export { sendMessage };
