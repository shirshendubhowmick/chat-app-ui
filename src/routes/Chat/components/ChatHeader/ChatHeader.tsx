import { socketStatusMap } from '~/constants';
import { SocketStatus } from '~/types';
import './ChatHeader.css';

export interface ChatHeaderProps {
  socketStatus: SocketStatus;
  name?: string;
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
      {headerTextMap[props.socketStatus]}
      {props.socketStatus === socketStatusMap.CONNECTED && props.name}
    </div>
  );
}

ChatHeader.defaultProps = {
  name: 'viewer only',
};

export default ChatHeader;
