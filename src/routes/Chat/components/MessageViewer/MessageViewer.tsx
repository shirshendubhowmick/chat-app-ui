import { ForwardedRef, forwardRef } from 'react';

import { Message } from '~/types';
import ChatMessage from '../ChatMessage/ChatMessage';
import './MessageViewer.css';

export interface MessageViewerProps {
  messages: Map<number, Message>;
}

function MessageViewer(
  props: MessageViewerProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const messages: JSX.Element[] = [];

  props.messages.forEach((message) => {
    messages.push(<ChatMessage message={message} key={message.id} />);
  });

  return (
    <div styleName="container" ref={ref}>
      {messages}
    </div>
  );
}

export default forwardRef(MessageViewer);
