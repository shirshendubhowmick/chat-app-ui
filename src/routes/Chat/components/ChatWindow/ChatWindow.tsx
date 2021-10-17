import { useCallback, useEffect, useRef, useState } from 'react';
import MessageInput from '../MessageInput/MessageInput';
import {
  AcknowledgementMessage,
  sendMessage as socketSendMessage,
  subscribeToMessageBroadcast,
  subscribeToSystemMessage,
} from '~/services/socketService';
import MessageViewer from '../MessageViewer/MessageViewer';
import { Message, SocketStatus, UserData } from '~/types';
import initNetworkRequest from '~/services/networkServices';
import { socketStatusMap } from '~/constants';
import apiMap from '~/constants/apiMap';
import showToast from '~/components/Toast';
import toastMessageMap from '~/constants/toastMessageMap';

import './ChatWindow.css';

export interface ChatWindowProps {
  adminUserData: UserData | null;
  socketStatus: SocketStatus;
}

function loadHistoricalMessages(
  setMessages: React.Dispatch<React.SetStateAction<Map<number, Message>>>,
) {
  initNetworkRequest({
    method: apiMap.GET_HISTORICAL_MESSAGES.method,
    URL: API_URL + apiMap.GET_HISTORICAL_MESSAGES.endpoint,
  })
    .then((response) => {
      const { data: oldMessages }: { data: Message[] } = response.data;
      if (oldMessages.length) {
        const oldMessagesMap = new Map<number, Message>();
        oldMessages.forEach((message) => {
          oldMessagesMap.set(message.id, message);
        });
        setMessages(
          (currentState) =>
            new Map([...currentState.entries(), ...oldMessages.entries()]),
        );
      }
    })
    .catch((err) => {
      console.log(err);
      showToast(toastMessageMap.error.ERROR_LOADING_HISTORICAL_MSGS, true);
    });
}

function ChatWindow(props: ChatWindowProps) {
  const [messages, setMessages] = useState<Map<number, Message>>(new Map());
  const msgViewerRef = useRef<HTMLDivElement | null>(null);

  const connectedAsViewer =
    props.socketStatus === socketStatusMap.CONNECTED && !props.adminUserData;

  const sendMessage = useCallback(
    (message: string): Promise<void> =>
      new Promise<void>((resolve, reject) => {
        const sanitizedMessage = message.trim();
        if (!sanitizedMessage) {
          resolve();
          return;
        }

        socketSendMessage(message, (ack: AcknowledgementMessage) => {
          if (!ack.success) {
            showToast(toastMessageMap.error.ERROR_SENDING_MESSAGE, true);
            reject();
            return;
          }
          setMessages((currentState) => {
            const newState = new Map(currentState);

            newState.set(ack.msgId, {
              id: ack.msgId,
              timestamp: ack.timestamp,
              userId: (props.adminUserData as UserData).userId,
              name: (props.adminUserData as UserData).name,
              content: {
                text: message,
              },
              type: 'user',
            });

            resolve();

            return newState;
          });
        });
      }),
    [props.adminUserData],
  );

  const updateWithBroadcastMessage = useCallback((message: Message) => {
    setMessages((currentState) => {
      const newState = new Map(currentState);

      newState.set(message.id, message);
      return newState;
    });
  }, []);

  useEffect(() => {
    if (msgViewerRef.current) {
      msgViewerRef.current.scrollTop = msgViewerRef.current?.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    let unsubscribe: () => void;
    if (connectedAsViewer) {
      unsubscribe = subscribeToMessageBroadcast(updateWithBroadcastMessage);
    }

    return () => {
      unsubscribe?.();
    };
  }, [connectedAsViewer, updateWithBroadcastMessage]);

  useEffect(() => {
    loadHistoricalMessages(setMessages);
  }, []);

  useEffect(() => {
    if (props.socketStatus === socketStatusMap.CONNECTED) {
      subscribeToSystemMessage(updateWithBroadcastMessage);
    }
  }, [props.socketStatus, updateWithBroadcastMessage]);

  return (
    <div styleName="container">
      <MessageViewer messages={messages} ref={msgViewerRef} />
      <MessageInput sendMessage={sendMessage} disabled={!props.adminUserData} />
    </div>
  );
}

export default ChatWindow;
