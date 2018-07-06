// @flow
import type { EDEvent } from '_models';
export { default as saga } from './saga';

// Actions Types
const FETCH_EVENT = 'event/FETCH';
const FETCH_EVENT_SUCCESS = 'event/FETCH_SUCCESS';
const FETCH_EVENT_ERROR = 'event/FETCH_ERROR';
const TOGGLE_BROADCASTING = 'event/TOGGLE_BROADCASTING';
const TOGGLE_BROADCASTING_SUCCESS = 'event/TOGGLE_BROADCASTING_SUCCESS';
const TOGGLE_BROADCASTING_ERROR = 'event/TOGGLE_BROADCASTING_ERROR';
const RESET = 'event/RESET';

export type FetchEventAction = {
  type: 'event/FETCH',
  payload: number
};
export type FetchEventSuccessAction = {
  type: 'event/FETCH_SUCCESS',
  payload: EDEvent
};
export type FetchEventErrorAction = {
  type: 'event/FETCH_ERROR',
  payload: Error
};
export type ToggleEventBroadcastingAction = {
  type: 'event/TOGGLE_BROADCASTING',
  payload: { eventId: number, isBroadcast: boolean }
};
export type ToggleEventBroadcastingSuccessAction = {
  type: 'event/TOGGLE_BROADCASTING_SUCCESS',
  payload: { isBroadcast: boolean, modifiedAt: number }
};
export type ToggleEventBroadcastingErrorAction = {
  type: 'event/TOGGLE_BROADCASTING_ERROR',
  payload: Error
};
export type ResetEventAction = {
  type: 'event/RESET'
};

export type Action =
  | FetchEventAction
  | FetchEventSuccessAction
  | FetchEventErrorAction
  | ResetEventAction;

export const types = {
  FETCH_EVENT,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_ERROR,
  TOGGLE_BROADCASTING,
  TOGGLE_BROADCASTING_SUCCESS,
  TOGGLE_BROADCASTING_ERROR,
  RESET
};

// Actions
const fetchEvent = (eventId: number): FetchEventAction => ({
  type: FETCH_EVENT,
  payload: eventId
});

const setEventBroadcasting = (
  eventId: number,
  isBroadcast: boolean
): ToggleEventBroadcastingAction => ({
  type: TOGGLE_BROADCASTING,
  payload: {
    eventId,
    isBroadcast
  }
});

export const actions = {
  fetchEvent,
  setEventBroadcasting
};

// State/Reducer
export type State = {
  +event: ?EDEvent,
  +error: ?Error,
  +loading: boolean,
  +isTogglingBroadcasting: boolean
};

export const initialState = {
  event: null,
  error: null,
  loading: false,
  isTogglingBroadcasting: false
};

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_EVENT:
      return { ...state, loading: true };
    case FETCH_EVENT_SUCCESS:
      return { ...state, loading: false, event: action.payload };
    case FETCH_EVENT_ERROR:
      return { ...state, loading: false, error: action.payload };
    case RESET:
      return initialState;
    case TOGGLE_BROADCASTING:
      return { ...state, isTogglingBroadcasting: true };
    case TOGGLE_BROADCASTING_SUCCESS:
      return {
        ...state,
        isTogglingBroadcasting: false,
        event: {
          ...state.event,
          isBroadcast: action.payload.isBroadcast,
          modifiedAt: action.payload.modifiedAt
        }
      };
    case TOGGLE_BROADCASTING_ERROR:
      return {
        ...state,
        isTogglingBroadcasting: false
      };
    default:
      return state;
  }
};

// Selectors
type Store = {
  event: State
};

const selectEvent = (store: Store) => store.event.event;
const selectEventTogglingBroadcasting = (store: Store) =>
  store.event.isTogglingBroadcasting;

export const selectors = {
  selectEvent,
  selectEventTogglingBroadcasting
};
