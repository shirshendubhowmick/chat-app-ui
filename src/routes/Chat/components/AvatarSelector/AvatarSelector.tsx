import React, { useCallback } from 'react';
import Avatar from '~/components/Avatar/Avatar';
import userMap from '~/constants/userMap';
import './AvatarSelector.css';

export interface AvatarSelectorProps {
  onAvatarSelect: (userId: string) => void;
}

function AvatarSelector(props: AvatarSelectorProps) {
  const onAvatarSelect = useCallback(
    (userId: string) => {
      props.onAvatarSelect(userId);
    },
    [props],
  );

  return (
    <div styleName="container">
      {Object.values(userMap).map((user) => (
        <button
          type="button"
          styleName="avatar-button"
          key={user.userId}
          onClick={() => {
            onAvatarSelect(user.userId);
          }}
        >
          <Avatar avatarId={user.userId} />
          <p>{user.name}</p>
        </button>
      ))}
    </div>
  );
}

export default AvatarSelector;
