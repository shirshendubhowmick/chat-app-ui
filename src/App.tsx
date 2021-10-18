// eslint-disable-next-line no-restricted-syntax
import './styles/index.css';
import { useEffect, useState } from 'react';

import Chat from './routes/Chat/Chat';
import ToastContainer from './components/Toast/ToastContainer';
import { setTabMarker } from './services/storageServices';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTabMarker();
    setInterval(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ? <p>Loading Chat</p> : <Chat />}
      <ToastContainer />
    </>
  );
}

export default App;
