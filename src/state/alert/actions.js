// Constants
export const SUCCESS = 'alert/SUCCESS';
export const ERROR = 'alert/ERROR';
export const CLEAR = 'alert/CLEAR';

// Action creators
function success(message) {
  return {
    type: SUCCESS,
    payload: message
  };
}

function error(message) {
  return {
    type: ERROR,
    payload: message
  };
}

function clear() {
  return {
    type: CLEAR
  };
}

export default {
  success,
  error,
  clear
};
