// Constants
export const FETCH_ASYNC = 'mlbTeamStat/FETCH_ASYNC';
export const FETCH_ERROR = 'mlbTeamStat/FETCH_ERROR';
export const FETCH_SUCCESS = 'mlbTeamStat/FETCH_SUCCESS';
export const RESET = 'mlbTeamStat/RESET';

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
