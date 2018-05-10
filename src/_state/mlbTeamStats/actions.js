// Constants
export const FETCH_ASYNC = 'mlbTeamStats/FETCH_ASYNC';
export const FETCH_ERROR = 'mlbTeamStats/FETCH_ERROR';
export const FETCH_SUCCESS = 'mlbTeamStats/FETCH_SUCCESS';
export const RESET = 'mlbTeamStats/RESET';

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
