import { SocketStatus } from '~/types';

const socketStatusMap: { [key in SocketStatus]: SocketStatus } = {
  CONNECTED: 'CONNECTED',
  DISCONNECTED: 'DISCONNECTED',
  ERRORED: 'ERRORED',
  CONNECTING: 'CONNECTING',
};

// eslint-disable-next-line import/prefer-default-export
export { socketStatusMap };
