import Avatar from '~/components/Avatar/Avatar';
import { Message } from '~/types';
import './ChatMessage.css';

export interface ChatMessageProps {
  message: Message;
}

function ChatMessage(props: ChatMessageProps) {
  if (props.message.type === 'system') {
    return (
      <div styleName="container system">
        <p styleName="system-text">{props.message.content.text}</p>
      </div>
    );
  }

  return (
    <div styleName="container">
      <p styleName="text">{props.message.content.text}</p>
      <Avatar avatarId={props.message.userId} size="small" styleName="avatar" />
    </div>
  );
}

export default ChatMessage;
