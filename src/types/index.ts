export interface UserData {
  userId: string;
  name: string;
}

export interface AdminUserPositionStatus {
  isAdminUserPositionAvailable: boolean;
}

export type SocketStatus =
  | 'CONNECTED'
  | 'DISCONNECTED'
  | 'ERRORED'
  | 'CONNECTING';

export interface Message {
  id: number;
  name: string;
  type: 'user' | 'system';
  userId: string;
  timestamp: Date;
  content: {
    text: string;
  };
}
