import Avatar from '~/components/Avatar/Avatar';
import { Message } from '~/types';
import './ChatMessage.css';

export interface ChatMessageProps {
  message: Message;
}

function ChatMessage(props: ChatMessageProps) {
  return (
    <div styleName="container">
      <p styleName="text">{props.message.content.text}</p>
      <Avatar avatarId={props.message.userId} size="small" styleName="avatar" />
    </div>
  );
}

export default ChatMessage;
