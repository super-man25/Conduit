// @flow

// Constants
export const FETCH_ASYNC = 'event/FETCH_ASYNC';
export const FETCH_ERROR = 'event/FETCH_ERROR';
export const FETCH_SUCCESS = 'event/FETCH_SUCCESS';
export const RESET = 'event/RESET';
export const SEARCH = 'event/SEARCH';
export const VISIBLE_EVENTS = 'event/VISIBLE_EVENTS';
export const SET_ACTIVE_ID = 'event/SET_ACTIVE_ID';

export type Action =
  | { type: typeof FETCH_ASYNC, payload: boolean }
  | { type: typeof FETCH_ERROR, payload?: Error }
  | { type: typeof FETCH_SUCCESS, payload: any }
  | { type: typeof RESET }
  | { type: typeof SEARCH, payload: string }
  | { type: typeof VISIBLE_EVENTS, payload: any }
  | { type: typeof SET_ACTIVE_ID, payload: number };

// Action creators
function fetch(): Action {
  return {
    type: FETCH_ASYNC
  };
}

function clear(): Action {
  return {
    type: RESET
  };
}

function search(filter: string): Action {
  return {
    type: SEARCH,
    payload: filter
  };
}

function setActive(id: number): Action {
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
