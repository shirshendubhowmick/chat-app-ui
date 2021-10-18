const TAB_MARKER_KEY = 'openChatPage';

function initStorageEventListeners(duplicateTabCallback: () => void) {
  const storageEventListener = (e: StorageEvent) => {
    if (e.key === TAB_MARKER_KEY) {
      duplicateTabCallback();
    }
  };
  window.addEventListener('storage', storageEventListener);

  return storageEventListener;
}

function removeStorageEventListener(eventListener: (e: StorageEvent) => void) {
  window.removeEventListener('storage', eventListener);
}

function setTabMarker() {
  try {
    localStorage.setItem(TAB_MARKER_KEY, new Date().toISOString());
  } catch (err) {
    console.log(err);
  }
}

export default initStorageEventListeners;

export { setTabMarker, removeStorageEventListener };
