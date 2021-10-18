import React, { useCallback, useEffect, useState } from 'react';
import showToast from '~/components/Toast';
import toastMessageMap from '~/constants/toastMessageMap';
import './MessageInput.css';

export interface MessageInputProps {
  sendMessage(
    message: string | ArrayBuffer,
    isTypeFile?: boolean,
  ): Promise<void>;
  disabled?: boolean;
}

const MAX_FILE_SIZE = 500 * 1024;

const fileReader = new FileReader();

function MessageInput(props: MessageInputProps) {
  const [message, setMessage] = useState('');

  const onChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }, []);

  const onFileLoad = useCallback(
    (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        props.sendMessage(e.target.result, true);
      }
    },
    [props],
  );

  useEffect(() => {
    fileReader.addEventListener('load', onFileLoad);

    return () => {
      fileReader.removeEventListener('load', onFileLoad);
    };
  }, [onFileLoad]);

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

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }

      if (e.target.files[0].size > MAX_FILE_SIZE) {
        showToast(toastMessageMap.error.MAX_FILE_LIMIT_REACHED, true);
        return;
      }

      fileReader.readAsDataURL(e.target.files[0]);
    },
    [],
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
      <label
        htmlFor="image-upload"
        styleName={`image-upload ${
          props.disabled ? 'image-upload-disabled' : ''
        }`}
      >
        Attach image
        <input
          type="file"
          accept="image/png, image/jpeg"
          id="image-upload"
          className="display-none"
          onChange={handleImageUpload}
          disabled={props.disabled}
        />
      </label>
    </div>
  );
}

MessageInput.defaultProps = {
  disabled: false,
};

export default MessageInput;
