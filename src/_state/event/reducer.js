// @flow

import {
  FETCH_ASYNC,
  FETCH_SUCCESS,
  FETCH_ERROR,
  RESET,
  SEARCH,
  VISIBLE_EVENTS,
  SET_ACTIVE_ID
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
  selectedFilter: 1
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
    case RESET:
      return initialState;
    default:
      return state;
  }
}
