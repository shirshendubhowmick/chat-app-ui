import { useCallback, useEffect, useRef, useState } from 'react';
import MessageInput from '../MessageInput/MessageInput';
import {
  AcknowledgementMessage,
  sendMessage as socketSendMessage,
  subscribeToMessageBroadcast,
  unsubscribeToMessageBroadcast,
} from '~/services/socketService';
import MessageViewer from '../MessageViewer/MessageViewer';
import { Message, SocketStatus, UserData } from '~/types';
import { socketStatusMap } from '~/constants';

import './ChatWindow.css';

export interface ChatWindowProps {
  adminUserData: UserData | null;
  socketStatus: SocketStatus;
}

function ChatWindow(props: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const msgViewerRef = useRef<HTMLDivElement | null>(null);

  const connectedAsViewer =
    props.socketStatus === socketStatusMap.CONNECTED && !props.adminUserData;

  const sendMessage = useCallback(
    (message: string) => {
      const sanitizedMessage = message.trim();
      if (!sanitizedMessage) {
        return;
      }

      socketSendMessage(message, (ack: AcknowledgementMessage) => {
        setMessages((currentState) => [
          ...currentState,
          {
            id: ack.msgId,
            timestamp: ack.timestamp,
            userId: (props.adminUserData as UserData).userId,
            name: (props.adminUserData as UserData).name,
            content: {
              text: message,
            },
          },
        ]);
      });
    },
    [props.adminUserData],
  );

  const updateWithBroadcastMessage = useCallback((message: Message) => {
    setMessages((currentState) => [
      ...currentState,
      {
        ...message,
      },
    ]);
  }, []);

  useEffect(() => {
    if (msgViewerRef.current) {
      msgViewerRef.current.scrollTop = msgViewerRef.current?.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (connectedAsViewer) {
      subscribeToMessageBroadcast(updateWithBroadcastMessage);
    }

    return () => {
      unsubscribeToMessageBroadcast();
    };
  }, [connectedAsViewer, updateWithBroadcastMessage]);

  return (
    <div styleName="container">
      <MessageViewer messages={messages} ref={msgViewerRef} />
      <MessageInput sendMessage={sendMessage} disabled={!props.adminUserData} />
    </div>
  );
}

export default ChatWindow;
