export const FETCH_ASYNC = 'eventScoreHistory/FETCH_ASYNC';
export const FETCH_SUCCESS = 'eventScoreHistory/FETCH_SUCCESS';
export const FETCH_ERROR = 'eventScoreHistory/FETCH_ERROR';

function fetch(payload) {
  return {
    type: FETCH_ASYNC,
    payload
  };
}

export default {
  fetch
};
