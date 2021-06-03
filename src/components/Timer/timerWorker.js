/* eslint-disable no-param-reassign */
let currentTime = -1;
let interval;

export function backgroundTimer(startTime, callback) {
  currentTime = startTime;
  if (interval != null) {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    currentTime -= 1;

    callback(currentTime);

    // countdownHandler();
  }, 1000);

  return interval;
}

export function reset() {
  clearInterval(interval);
}
