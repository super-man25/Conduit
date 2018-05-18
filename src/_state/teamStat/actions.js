// Constants
export const FETCH_ASYNC = 'teamStat/FETCH_ASYNC';
export const FETCH_ERROR = 'teamStat/FETCH_ERROR';
export const FETCH_SUCCESS = 'teamStat/FETCH_SUCCESS';
export const RESET = 'teamStat/RESET';

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
