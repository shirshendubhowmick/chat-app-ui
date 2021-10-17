import { useCallback, useEffect, useRef, useState } from 'react';
import { eventName, ToastEventDetail } from '.';
import Toast, { ToastProps } from './components/Toast/Toast';
import './ToastContainer.css';

interface ToastsState extends ToastProps {
  id: number;
}

function ToastContainer() {
  const [toasts, setToasts] = useState<ToastsState[]>([]);
  const intervalRef = useRef<number>();

  const onShowToast = useCallback((e: CustomEvent<ToastEventDetail>) => {
    setToasts((currentState) => [
      ...currentState,
      {
        children: e.detail.msg,
        type: e.detail.type,
        id: new Date().getTime(),
      },
    ]);
  }, []) as EventListener;

  useEffect(() => {
    document.addEventListener(eventName, onShowToast);

    return () => {
      document.removeEventListener(eventName, onShowToast);
    };
  }, [onShowToast]);

  const registerToastCleanup = useCallback(() => {
    intervalRef.current = window.setInterval(() => {
      setToasts((currentState) => {
        if (currentState.length === 1) {
          console.log('Clearning interval');
          clearInterval(intervalRef.current);
        }
        return currentState.slice(1);
      });
    }, 1500);
  }, []);

  useEffect(() => {
    if (toasts.length === 1) {
      registerToastCleanup();
    }
  }, [registerToastCleanup, toasts.length]);

  return (
    <div styleName="container">
      {toasts.map((toast) => (
        <Toast type={toast.type} key={toast.id}>
          {toast.children}
        </Toast>
      ))}
    </div>
  );
}

export default ToastContainer;
