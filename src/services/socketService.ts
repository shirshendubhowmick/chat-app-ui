import { io, Socket } from 'socket.io-client';
import showToast from '~/components/Toast';
import { socketStatusMap } from '~/constants';
import toastMessageMap from '~/constants/toastMessageMap';
import { Message, SocketStatus } from '~/types';

let socket: Socket;

export interface AcknowledgementMessage {
  success: boolean;
  timestamp: string;
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
    showToast(toastMessageMap.success.SOCKET_CONNECTED);
    setSocketConnected(socketStatusMap.CONNECTED);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected, socket id', socket.id);
    showToast(toastMessageMap.error.SOCKET_DISCONNECTED, true);
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
  const receivedBroadcastMessage = (payload: Message) => {
    console.log('Received broadcast message', payload);
    updateMessage(payload);
  };
  socket.on('message', receivedBroadcastMessage);
  return () => {
    socket.off('message', receivedBroadcastMessage);
  };
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
    showToast(toastMessageMap.success.ADMIN_USER_LEFT);
    setState(true);
    socket.disconnect();
  };
  socket.on('adminPositionAvailable', adminPositionAvailable);

  return () => {
    socket.off('adminPositionAvailable', adminPositionAvailable);
  };
}

function disconnectSocket(
  setSocketDisconnect: React.Dispatch<React.SetStateAction<SocketStatus>>,
) {
  socket.disconnect();
  setSocketDisconnect(socketStatusMap.DISCONNECTED);
}

export default initSocketConnection;

export {
  sendMessage,
  subscribeToMessageBroadcast,
  subscribeToSystemMessage,
  subscribeToAdminPosition,
  disconnectSocket,
};
