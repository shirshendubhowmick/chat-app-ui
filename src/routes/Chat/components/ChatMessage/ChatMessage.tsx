import ReactMarkdown from 'react-markdown';
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
        <p styleName="system-text">{props.message.content.data}</p>
      </div>
    );
  }

  return (
    <div styleName="container">
      <p className="font-10">
        {new Date(props.message.timestamp).toLocaleString('en-IN')}
      </p>
      <div>
        <ReactMarkdown styleName="text">
          {props.message.content.data}
        </ReactMarkdown>
        <Avatar
          avatarId={props.message.userId}
          size="small"
          styleName="avatar"
        />
      </div>
    </div>
  );
}

export default ChatMessage;
