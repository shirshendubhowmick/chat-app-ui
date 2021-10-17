import React, { useCallback, useState } from 'react';
import './MessageInput.css';

export interface MessageInputProps {
  sendMessage(message: string): Promise<void>;
  disabled?: boolean;
}

function MessageInput(props: MessageInputProps) {
  const [message, setMessage] = useState('');

  const onChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }, []);

  const onKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.code === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        try {
          await props.sendMessage(message);
          setMessage('');
        } catch (err) {
          console.log('Send msg failed');
        }
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
        disabled={props.disabled}
      />
    </div>
  );
}

MessageInput.defaultProps = {
  disabled: false,
};

export default MessageInput;
