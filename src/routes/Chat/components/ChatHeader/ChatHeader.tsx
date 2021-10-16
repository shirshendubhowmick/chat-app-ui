import { socketStatusMap } from '~/constants';
import { SocketStatus } from '~/types';
import './ChatHeader.css';

export interface ChatHeaderProps {
  socketStatus: SocketStatus;
  name?: string;
  onLogoutClick: () => void;
}

const headerTextMap: { [key in SocketStatus]: string } = {
  CONNECTED: 'Connected as ',
  DISCONNECTED: 'Disconnected',
  ERRORED: 'Connection errored',
  CONNECTING: 'Establishing connection.....',
};

function ChatHeader(props: ChatHeaderProps) {
  return (
    <div styleName="container">
      <span styleName="header-text">
        {headerTextMap[props.socketStatus]}
        {props.socketStatus === socketStatusMap.CONNECTED &&
          (props.name || 'viewer only')}
      </span>
      {Boolean(props.name) && (
        <button
          type="button"
          styleName="logout-button"
          onClick={props.onLogoutClick}
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default ChatHeader;
