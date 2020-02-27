// Constants
export const SUCCESS_ASYNC = 'alert/SUCCESS_ASYNC';
export const ERROR_ASYNC = 'alert/ERROR_ASYNC';
export const SUCCESS = 'alert/SUCCESS';
export const ERROR = 'alert/ERROR';
export const CLEAR = 'alert/CLEAR';

// Action creators
function success(message, duration) {
  return {
    type: SUCCESS_ASYNC,
    payload: { message, duration },
  };
}

function error(message) {
  return {
    type: ERROR_ASYNC,
    payload: message,
  };
}

function clear() {
  return {
    type: CLEAR,
  };
}

export default {
  success,
  error,
  clear,
};
