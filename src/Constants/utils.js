export const createNotification = data => {
  if (data == null || !data) {
    return false;
  }

  const title = data.title === undefined ? 'Notification' : data.title;
  const { clickCallback } = data;
  const message = data.message === undefined ? 'null' : data.message;
  const icon =
    data.icon === undefined
      ? 'https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/hourglass-64.png'
      : data.icon;

  const sendNotification = () => {
    const notification = new Notification(title, {
      icon,
      body: message
    });
    if (clickCallback !== undefined) {
      notification.onclick = () => {
        // clickCallback();
        notification.close();
      };
    }
  };

  if (!window.Notification) {
    return false;
  }
  if (Notification.permission === 'default') {
    Notification.requestPermission(p => {
      if (p !== 'denied') {
        sendNotification();
      }
    });
  } else {
    sendNotification();
    return true;
  }
  return false;
};

export const requestNotificationPermission = () => {
  Notification.requestPermission();
};

export const isPermissionGranted = () => {
  return Notification.permission !== 'default';
};