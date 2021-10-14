import { ReactNode } from 'react';
import './Modal.css';

export interface ModalProps {
  children: ReactNode;
  headerContent?: JSX.Element | string;
  showBackdrop?: boolean;
}

function Modal(props: ModalProps) {
  return (
    <>
      {props.showBackdrop && <div styleName="backdrop" />}

      <div styleName="container">
        {Boolean(props.headerContent) && (
          <div styleName="header">{props.headerContent}</div>
        )}
        <div styleName="main">{props.children}</div>
      </div>
    </>
  );
}

Modal.defaultProps = {
  showBackdrop: false,
};

export default Modal;
