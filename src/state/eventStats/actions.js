// Constants
export const FETCH_ASYNC = 'eventStats/FETCH_ASYNC';
export const FETCH_ERROR = 'eventStats/FETCH_ERROR';
export const FETCH_SUCCESS = 'eventStats/FETCH_SUCCESS';
export const RESET = 'eventStats/RESET';

// Action creators
function fetch() {
  return {
    type: FETCH_ASYNC
  };
}

function clear() {
  return {
    type: RESET
  };
}

export default {
  fetch,
  clear
};
