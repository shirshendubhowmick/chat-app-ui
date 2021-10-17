export const eventName = 'showToast';

export interface ToastEventDetail {
  msg: string | JSX.Element;
  type: 'error' | 'success';
}

function showToast(
  msg: ToastEventDetail['msg'],
  type: ToastEventDetail['type'] = 'success',
) {
  const event = new CustomEvent<ToastEventDetail>(eventName, {
    detail: {
      type,
      msg,
    },
  });

  document.dispatchEvent(event);
}

export default showToast;
