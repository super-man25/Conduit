// Constants
export const FETCH_ASYNC = 'events/FETCH_ASYNC';
export const FETCH_ERROR = 'events/FETCH_ERROR';
export const FETCH_SUCCESS = 'events/FETCH_SUCCESS';
export const RESET = 'events/RESET';
export const SEARCH = 'events/SEARCH';
export const VISIBLE_EVENTS = 'events/VISIBLE_EVENTS';
export const SET_ACTIVE_ID = 'events/SET_ACTIVE_ID';

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

function search(filter) {
  return {
    type: SEARCH,
    payload: filter
  };
}

function setActive(id) {
  return {
    type: SET_ACTIVE_ID,
    payload: id
  };
}

export default {
  fetch,
  clear,
  search,
  setActive
};
