import { useCallback } from 'react';
import MessageInput from '../MessageInput/MessageInput';
import { sendMessage as socketSendMessage } from '~/services/socketService';

import './ChatWindow.css';

function ChatWindow() {
  const sendMessage = useCallback((message: string) => {
    socketSendMessage(message);
  }, []);
  return (
    <div styleName="container">
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
}

export default ChatWindow;
