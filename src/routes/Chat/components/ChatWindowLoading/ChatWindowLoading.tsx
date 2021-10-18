import Loader from '~/components/Loader/Loader';

import './ChatWindowLoading.css';

function ChatWindowLoading() {
  return (
    <div styleName="container">
      <Loader className="mlr-auto" />
    </div>
  );
}

export default ChatWindowLoading;
