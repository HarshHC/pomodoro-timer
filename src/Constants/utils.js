export const createNotification = data => {
  const isIOS =
    (/iPad|iPhone|iPod/.test(navigator.platform) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
    !window.MSStream;

  if (isIOS) return true;

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
  const isIOS =
    (/iPad|iPhone|iPod/.test(navigator.platform) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
    !window.MSStream;

  if (isIOS) return;
  Notification.requestPermission().then(() => {
    // console.log(result);
  });
};

export const isPermissionGranted = () => {
  const isIOS =
    (/iPad|iPhone|iPod/.test(navigator.platform) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
    !window.MSStream;

  console.log('test');
  if (isIOS) return true;
  return Notification.permission !== 'default';
};

export const calculateDays = endDate => {
  const currentTime = Math.floor(Date.now() / 1000);
  const difference = endDate - currentTime;

  const daysDifference = Math.floor(difference / 60 / 60 / 24);
  return daysDifference;
};

export const calculateHours = endDate => {
  const currentTime = Math.floor(Date.now() / 1000);
  const difference = endDate - currentTime;

  const hoursDiff = Math.floor((difference / 60 / 60) % 24);
  return hoursDiff;
};
