// Constants
export const FETCH_ASYNC = 'events/FETCH_ASYNC';
export const FETCH_ERROR = 'events/FETCH_ERROR';
export const FETCH_SUCCESS = 'events/FETCH_SUCCESS';
export const RESET = 'events/RESET';

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
