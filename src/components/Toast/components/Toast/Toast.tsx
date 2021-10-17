import './Toast.css';

export interface ToastProps {
  type?: 'error' | 'success';
  children: JSX.Element | string;
}

function Toast(props: ToastProps) {
  return <div styleName={`container ${props.type}`}>{props.children}</div>;
}

Toast.defaultProps = {
  type: 'success',
};

export default Toast;
