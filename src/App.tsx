// eslint-disable-next-line no-restricted-syntax
import './styles/index.css';

import Chat from './routes/Chat/Chat';
import ToastContainer from './components/Toast/ToastContainer';

function App() {
  return (
    <>
      <Chat />
      <ToastContainer />
    </>
  );
}

export default App;
