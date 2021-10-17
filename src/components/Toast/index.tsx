export const eventName = 'showToast';

export interface ToastEventDetail {
  msg: string | JSX.Element;
  type: 'error' | 'success';
}

function showToast(msg: ToastEventDetail['msg'], isError = false) {
  const event = new CustomEvent<ToastEventDetail>(eventName, {
    detail: {
      type: isError ? 'error' : 'success',
      msg,
    },
  });

  document.dispatchEvent(event);
}

export default showToast;
