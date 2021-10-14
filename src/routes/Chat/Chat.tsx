import { useCallback, useEffect, useState } from 'react';

import ChatHeader from './components/ChatHeader/ChatHeader';
import ChatWindow from './components/ChatWindow/ChatWindow';
import Modal from '~/components/Modal/Modal';
import AvatarSelector from './components/AvatarSelector/AvatarSelector';
import initNetworkRequest from '~/services/networkServices';

import apiMap from '~/constants/apiMap';
import { UserData } from '~/types';
import initSocketConnection from '~/services/socketService';

import './Chat.css';

function Chat() {
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [adminUserData, setAdminUserData] = useState<UserData | null>(null);

  useEffect(() => {
    setShowAvatarSelector(true);
    initSocketConnection();
  }, []);

  useEffect(() => {
    if (adminUserData) {
      console.log(adminUserData);
      setShowAvatarSelector(false);
    }
  }, [adminUserData]);

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
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div styleName="container">
      <ChatHeader />
      <ChatWindow />
      {showAvatarSelector && (
        <Modal headerContent="Select user">
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
