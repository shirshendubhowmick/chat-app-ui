import classnames from 'classnames';

import userMap from '~/constants/userMap';
import './Avatar.css';

export interface AvatarProps {
  avatarId: string;
  lightBorder: boolean;
  className?: string;
  styleName?: string;
  size?: 'normal' | 'small';
}

function Avatar(props: AvatarProps) {
  return (
    <span
      styleName={classnames(
        'container',
        { 'light-border': props.lightBorder },
        `size-${props.size}`,
      )}
      className={props.className}
      style={{ backgroundImage: `url(${userMap[props.avatarId].avatar})` }}
    />
  );
}

Avatar.defaultProps = {
  lightBorder: false,
  className: '',
  size: 'normal',
};

export default Avatar;
