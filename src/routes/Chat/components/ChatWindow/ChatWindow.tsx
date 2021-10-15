import { useCallback, useEffect, useRef, useState } from 'react';
import MessageInput from '../MessageInput/MessageInput';
import { sendMessage as socketSendMessage } from '~/services/socketService';
import MessageViewer from '../MessageViewer/MessageViewer';
import { Messages, UserData } from '~/types';

import './ChatWindow.css';

export interface ChatWindowProps {
  adminUserData: UserData | null;
}

function ChatWindow(props: ChatWindowProps) {
  const [messages, setMessages] = useState<Messages[]>([]);
  const msgViewerRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = useCallback(
    (message: string) => {
      const sanitizedMessage = message.trim();
      if (!sanitizedMessage) {
        return;
      }
      setMessages((currentState) => [
        ...currentState,
        {
          userId: (props.adminUserData as UserData).userId,
          name: (props.adminUserData as UserData).name,
          content: {
            text: message,
          },
        },
      ]);
      socketSendMessage(message);
    },
    [props.adminUserData],
  );

  useEffect(() => {
    if (msgViewerRef.current) {
      msgViewerRef.current.scrollTop = msgViewerRef.current?.scrollHeight;
    }
  }, [messages]);

  if (!props.adminUserData) {
    return <div styleName="container">Loading......</div>;
  }

  return (
    <div styleName="container">
      <MessageViewer messages={messages} ref={msgViewerRef} />
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
}

export default ChatWindow;
