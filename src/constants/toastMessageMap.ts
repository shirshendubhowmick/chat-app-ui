const toastMessageMap = {
  success: {
    ADMIN_USER_LEFT: 'Admin user has left the chat',
    SOCKET_CONNECTED: 'Connected to chat server',
  },
  error: {
    DEFAULT: "Something wen't wrong",
    ADMIN_POSITION_NO_LONGER_AVAILABLE:
      'Admin user position is no longer available, joined as a viewer',
    ERROR_LOADING_HISTORICAL_MSGS: 'Unable to load earlier messages',
    LOGOUT_ERROR: 'Error logging out,please retry',
    ERROR_CHECKING_STATUS: 'Error checking chat service status',
    SOCKET_DISCONNECTED: 'Chat server disconnected',
  },
};

export default toastMessageMap;
