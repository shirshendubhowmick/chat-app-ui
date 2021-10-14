import ChatHeader from './components/ChatHeader/ChatHeader';
import ChatWindow from './components/ChatWindow/ChatWindow';
import './Chat.css';

function Chat() {
  return (
    <div styleName="container">
      <ChatHeader />
      <ChatWindow />
    </div>
  );
}

export default Chat;
