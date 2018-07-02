// @flow
import type { EDEvent } from '_models';

// Constants
export const FETCH_ASYNC = 'event/FETCH_ASYNC';
export const FETCH_ERROR = 'event/FETCH_ERROR';
export const FETCH_SUCCESS = 'event/FETCH_SUCCESS';
export const RESET = 'event/RESET';
export const SEARCH = 'event/SEARCH';
export const VISIBLE_EVENTS = 'event/VISIBLE_EVENTS';
export const SET_ACTIVE_ID = 'event/SET_ACTIVE_ID';
export const SET_BROADCASTING = 'event/SET_BROADCASTING';
export const SET_BROADCASTING_SUCCESS = 'event/SET_BROADCASTING_SUCCESS';
export const SET_BROADCASTING_ERROR = 'event/SET_BROADCASTING_ERROR';

export type FetchAsyncAction = { type: 'event/FETCH_ASYNC' };
export type FetchSuccessAction = {
  type: 'event/FETCH_SUCCESS',
  payload: EDEvent[]
};
export type FetchErrorAction = { type: 'event/FETCH_ERROR', payload: Error };
export type ResetAction = { type: 'event/RESET' };
export type SearchAction = { type: 'event/SEARCH', payload: string };
export type VisibleEventsAction = {
  type: 'event/VISIBLE_EVENTS',
  payload: EDEvent[]
};
export type SetActiveIdAction = {
  type: 'event/SET_ACTIVE_ID',
  payload: number
};
export type SetBroadcastingAction = {
  type: 'event/SET_BROADCASTING',
  payload: {
    eventId: number,
    isBroadcast: boolean
  }
};
export type SetBroadcastingSuccessAction = {
  type: 'event/SET_BROADCASTING_SUCCESS',
  payload: { isBroadcast: boolean, modifiedAt: Date, eventId: number }
};
export type SetBroadcastingErrorAction = {
  type: 'event/SET_BROADCASTING_ERROR',
  payload: Error
};

export type Action =
  | FetchAsyncAction
  | FetchErrorAction
  | FetchSuccessAction
  | ResetAction
  | SearchAction
  | VisibleEventsAction
  | SetActiveIdAction
  | SetBroadcastingAction
  | SetBroadcastingSuccessAction
  | SetBroadcastingErrorAction;

// Action creators
function fetch(): FetchAsyncAction {
  return {
    type: FETCH_ASYNC
  };
}

function clear(): ResetAction {
  return {
    type: RESET
  };
}

function search(filter: string): SearchAction {
  return {
    type: SEARCH,
    payload: filter
  };
}

function setActive(id: number): SetActiveIdAction {
  return {
    type: SET_ACTIVE_ID,
    payload: id
  };
}

function setBroadcasting(
  id: number,
  isBroadcast: boolean
): SetBroadcastingAction {
  return {
    type: SET_BROADCASTING,
    payload: {
      eventId: id,
      isBroadcast
    }
  };
}

export default {
  fetch,
  clear,
  search,
  setActive,
  setBroadcasting
};
