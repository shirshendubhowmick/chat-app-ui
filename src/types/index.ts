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
