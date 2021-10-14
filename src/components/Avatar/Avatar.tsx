import classnames from 'classnames';

import userMap from '~/constants/userMap';
import './Avatar.css';

export interface AvatarProps {
  avatarId: string;
  lightBorder: boolean;
  className?: string;
  styleName?: string;
}

function Avatar(props: AvatarProps) {
  return (
    <span
      styleName={classnames('container', { 'light-border': props.lightBorder })}
      className={props.className}
      style={{ backgroundImage: `url(${userMap[props.avatarId].avatar})` }}
    />
  );
}

Avatar.defaultProps = {
  lightBorder: false,
  className: '',
};

export default Avatar;
