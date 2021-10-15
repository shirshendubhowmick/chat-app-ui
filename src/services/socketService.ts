import { io, Socket } from 'socket.io-client';
import { socketStatusMap } from '~/constants';
import { Message, SocketStatus } from '~/types';

let socket: Socket;

export interface AcknowledgementMessage {
  success: boolean;
  timestamp: Date;
  msgId: number;
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

function sendMessage(
  text: string,
  ackCallBack: (arg: AcknowledgementMessage) => void,
) {
  socket.emit(
    'message',
    {
      text,
    },
    (ack: AcknowledgementMessage) => {
      ackCallBack(ack);
      console.log(ack);
    },
  );
}

function subscribeToMessageBroadcast(updateMessage: (arg: Message) => void) {
  console.log('Register broadcast');
  socket.on('message', (payload: Message) => {
    console.log('Received broadcast message', payload);
    updateMessage(payload);
  });
}

function unsubscribeToMessageBroadcast() {
  socket.removeAllListeners('message');
}

function subscribeToSystemMessage(updateMessage: (arg: Message) => void) {
  console.log('Registered for system messages');
  socket.on('systemMessage', (payload: Message) => {
    console.log('Received system message', payload);
    updateMessage(payload);
  });
}

function subscribeToAdminPosition(
  setState: React.Dispatch<React.SetStateAction<boolean>>,
) {
  console.log('Registered for admin position availability');
  const adminPositionAvailable = () => {
    console.log('Received admin position availability message');
    setState(true);
  };
  socket.on('adminPositionAvailable', adminPositionAvailable);

  return () => {
    socket.off('adminPositionAvailable', adminPositionAvailable);
  };
}

export default initSocketConnection;

export {
  sendMessage,
  subscribeToMessageBroadcast,
  unsubscribeToMessageBroadcast,
  subscribeToSystemMessage,
  subscribeToAdminPosition,
};
