// @flow

// Constants
export const FETCH_ASYNC = 'teamStat/FETCH_ASYNC';
export const FETCH_ERROR = 'teamStat/FETCH_ERROR';
export const FETCH_SUCCESS = 'teamStat/FETCH_SUCCESS';
export const RESET = 'teamStat/RESET';

export type Action = { type: typeof FETCH_ASYNC } | { type: typeof RESET };

// Action creators
function fetch(): Action {
  return {
    type: FETCH_ASYNC
  };
}

function resetTeamStat(): Action {
  return {
    type: RESET
  };
}

export default {
  fetch,
  resetTeamStat
};
