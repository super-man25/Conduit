// @flow

import {
  FETCH_ASYNC,
  FETCH_SUCCESS,
  FETCH_ERROR,
  RESET,
  SEARCH,
  VISIBLE_EVENTS,
  SET_ACTIVE_ID,
  SET_BROADCASTING,
  SET_BROADCASTING_SUCCESS,
  SET_BROADCASTING_ERROR
} from './actions';
import type { Action } from './actions';
import type { EDEvent } from '_models';

type State = {
  +loading: boolean,
  +events: Array<EDEvent>,
  +visibleEvents: any,
  +filter: string,
  +activeId: number,
  +filterOptions: Array<{
    +id: number,
    +label: string
  }>,
  +sortDir: string,
  +selectedFilter: number,
  +error?: any
};

export const initialState: State = {
  loading: false,
  events: [],
  visibleEvents: [],
  filter: '',
  activeId: 0,
  filterOptions: [
    {
      id: 1,
      label: 'All Events'
    },
    {
      id: 2,
      label: 'Promotions'
    }
  ],
  sortDir: 'asc',
  selectedFilter: 1,
  isTogglingBroadcasting: false
};

export default function eventsReducer(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case FETCH_ASYNC:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload
      };
    case VISIBLE_EVENTS:
      return { ...state, visibleEvents: action.payload };
    case FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };
    case SEARCH:
      return { ...state, filter: action.payload };
    case SET_ACTIVE_ID:
      return { ...state, activeId: action.payload };
    case SET_BROADCASTING:
      return { ...state, isTogglingBroadcasting: true };
    case SET_BROADCASTING_ERROR:
      return { ...state, isTogglingBroadcasting: false };
    case RESET:
      return initialState;
    case SET_BROADCASTING_SUCCESS:
      const { eventId, isBroadcast, modifiedAt } = action.payload;

      return {
        ...state,
        isTogglingBroadcasting: false,
        events: state.events.map((event) => {
          if (event.id === eventId) {
            return { ...event, isBroadcast, modifiedAt };
          }

          return event;
        })
      };
    default:
      return state;
  }
}
