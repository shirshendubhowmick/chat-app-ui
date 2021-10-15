import { ForwardedRef, forwardRef } from 'react';

import { Messages } from '~/types';
import ChatMessage from '../ChatMessage/ChatMessage';
import './MessageViewer.css';

export interface MessageViewerProps {
  messages: Messages[];
}

function MessageViewer(
  props: MessageViewerProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div styleName="container" ref={ref}>
      {props.messages.map((message) => (
        <ChatMessage message={message} />
      ))}
    </div>
  );
}

export default forwardRef(MessageViewer);
