import ChatHeader from '../ChatHeader/ChatHeader';
import ChatWindow from '../ChatWindow/ChatWindow';
import './ChatContainer.css';

function ChatContainer() {
  return (
    <div styleName="container">
      <ChatHeader />
      <ChatWindow />
    </div>
  );
}

export default ChatContainer;
