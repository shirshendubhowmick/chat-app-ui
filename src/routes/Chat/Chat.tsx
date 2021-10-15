import { useCallback, useEffect, useState } from 'react';

import ChatHeader from './components/ChatHeader/ChatHeader';
import ChatWindow from './components/ChatWindow/ChatWindow';
import Modal from '~/components/Modal/Modal';
import AvatarSelector from './components/AvatarSelector/AvatarSelector';
import initNetworkRequest from '~/services/networkServices';

import apiMap from '~/constants/apiMap';
import { AdminUserPositionStatus, SocketStatus, UserData } from '~/types';
import initSocketConnection, {
  subscribeToAdminPosition,
} from '~/services/socketService';
import { socketStatusMap } from '~/constants';
import ChatWindowLoading from './components/ChatWindowLoading/ChatWindowLoading';
import apiErrorMap from '~/constants/apiErrorMap';

import './Chat.css';

function Chat() {
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [adminUserData, setAdminUserData] = useState<UserData | null>(null);
  const [socketStatus, setSocketStatus] = useState<SocketStatus>(
    socketStatusMap.CONNECTING,
  );

  useEffect(() => {
    initNetworkRequest({
      method: apiMap.GET_SESSION_STATUS.method,
      URL: API_URL + apiMap.GET_SESSION_STATUS.endpoint,
    })
      .then((res) => {
        const { data }: { data: AdminUserPositionStatus } = res.data;
        if (data.isAdminUserPositionAvailable) {
          setShowAvatarSelector(true);
        } else {
          initSocketConnection(setSocketStatus);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (adminUserData) {
      console.log(adminUserData);
      setShowAvatarSelector(false);
      initSocketConnection(setSocketStatus);
    }
  }, [adminUserData]);

  useEffect(() => {
    let unsubscribe: () => void;
    if (socketStatus === socketStatusMap.CONNECTED) {
      unsubscribe = subscribeToAdminPosition(setShowAvatarSelector);
    }

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [socketStatus]);

  const onAvatarSelect = useCallback(async (userId: string) => {
    try {
      const response = await initNetworkRequest({
        method: apiMap.CREATE_SESSION.method,
        URL: API_URL + apiMap.CREATE_SESSION.endpoint,
        body: {
          userId,
        },
      });
      const { data: userData }: { data: UserData } = response.data;
      setAdminUserData(userData);
    } catch (err: any) {
      console.log(err);
      if (!err.fetchFailure) {
        const { errors } = err.data;
        if (errors?.[0].code === apiErrorMap.E005.code) {
          console.log(errors?.[0].detail);
          initSocketConnection(setSocketStatus);
          setShowAvatarSelector(false);
        }
      }
    }
  }, []);

  return (
    <div styleName="container">
      <ChatHeader socketStatus={socketStatus} name={adminUserData?.name} />
      {socketStatus !== socketStatusMap.CONNECTED ? (
        <ChatWindowLoading />
      ) : (
        <ChatWindow socketStatus={socketStatus} adminUserData={adminUserData} />
      )}

      {showAvatarSelector && (
        <Modal headerContent="Select user" showBackdrop>
          <p className="mb-24 font-medium">
            Select an Avatar to join as admin user
          </p>
          <AvatarSelector onAvatarSelect={onAvatarSelect} />
        </Modal>
      )}
    </div>
  );
}

export default Chat;
