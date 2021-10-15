import { ForwardedRef, forwardRef } from 'react';

import { Message } from '~/types';
import ChatMessage from '../ChatMessage/ChatMessage';
import './MessageViewer.css';

export interface MessageViewerProps {
  messages: Message[];
}

function MessageViewer(
  props: MessageViewerProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div styleName="container" ref={ref}>
      {props.messages.map((message) => (
        <ChatMessage message={message} key={message.id} />
      ))}
    </div>
  );
}

export default forwardRef(MessageViewer);
