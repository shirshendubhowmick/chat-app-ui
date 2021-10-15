import React, { useCallback, useState } from 'react';
import './MessageInput.css';

export interface MessageInputProps {
  sendMessage(message: string): void;
}

function MessageInput(props: MessageInputProps) {
  const [message, setMessage] = useState('');

  const onChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.code === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        props.sendMessage(message);
        setMessage('');
      }
    },
    [message, props],
  );

  return (
    <div>
      <textarea
        placeholder="Type a message...."
        styleName="textarea"
        spellCheck
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={message}
      />
    </div>
  );
}

export default MessageInput;
