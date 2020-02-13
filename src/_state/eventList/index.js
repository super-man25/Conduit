// @flow
import type { EDEvent } from '_models';
import { createSelector } from 'reselect';
import { selectRouterLocation } from '../selectors';
export { default as saga } from './saga';

// Action Types
const FETCH_EVENT_LIST = 'eventList/FETCH';
const FETCH_EVENT_LIST_SUCCESS = 'eventList/FETCH_SUCCESS';
const FETCH_EVENT_LIST_ERROR = 'eventList/FETCH_ERROR';
const SET_VISIBLE_EVENTS = 'eventList/SET_VISIBLE_EVENTS';
const RESET = 'eventList/RESET';
const SEARCH = 'eventList/SEARCH';

export type FetchEventListAction = {
  type: 'eventList/FETCH',
  payload: { seasonId?: number },
};
export type FetchEventListSuccessAction = {
  type: 'eventList/FETCH_SUCCESS',
  payload: EDEvent[],
};
export type FetchEventListErrorAction = {
  type: 'eventList/FETCH_ERROR',
  payload: Error,
};
export type SetVisibleEventsAction = {
  type: 'eventList/SET_VISIBLE_EVENTS',
  payload: EDEvent[],
};
export type ResetEventListAction = { type: 'eventList/RESET' };
export type SearchEventListAction = {
  type: 'eventList/SEARCH',
  payload: string,
};

export type Action =
  | FetchEventListAction
  | FetchEventListSuccessAction
  | FetchEventListErrorAction
  | SetVisibleEventsAction
  | ResetEventListAction
  | SearchEventListAction;

export const types = {
  FETCH_EVENT_LIST,
  FETCH_EVENT_LIST_SUCCESS,
  FETCH_EVENT_LIST_ERROR,
  SET_VISIBLE_EVENTS,
  RESET,
  SEARCH,
};

// Actions
const fetchEventList = (payload: {
  seasonId?: number,
}): FetchEventListAction => ({ type: FETCH_EVENT_LIST, payload });
const resetEventList = (): ResetEventListAction => ({ type: RESET });
const searchEventList = (query: string): SearchEventListAction => ({
  type: SEARCH,
  payload: query,
});
const setVisibleEvents = (events: EDEvent[]): SetVisibleEventsAction => ({
  type: SET_VISIBLE_EVENTS,
  payload: events,
});

export const actions = {
  fetchEventList,
  resetEventList,
  searchEventList,
  setVisibleEvents,
};

// State/Reducer
export type State = {
  +events: EDEvent[],
  +visibleEvents: EDEvent[],
  +loading: boolean,
  +filter: string,
  +filterOptions: Array<{
    +id: number,
    +label: string,
  }>,
  +sortDir: string,
  +selectedFilter: number,
  +error: ?Error,
};

export const initialState: State = {
  events: [],
  visibleEvents: [],
  loading: false,
  filter: '',
  filterOptions: [
    { id: 1, label: 'All Events' },
    { id: 2, label: 'Promotions' },
  ],
  sortDir: 'asc',
  selectedFilter: 1,
  error: null,
};

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_EVENT_LIST:
      return { ...state, loading: true };
    case FETCH_EVENT_LIST_SUCCESS:
      return { ...state, events: action.payload };
    case FETCH_EVENT_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };
    case SET_VISIBLE_EVENTS:
      return { ...state, loading: false, visibleEvents: action.payload };
    case SEARCH:
      return { ...state, filter: action.payload };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

// Selectors
type Store = {
  eventList: State,
};

const selectEventList = (store: Store) => store.eventList.events;
const selectVisibleEvents = (store: Store) => store.eventList.visibleEvents;
const selectEventListSearchFilter = (store: Store) => store.eventList.filter;
const selectCurrentFilterOption = (store: Store) =>
  store.eventList.filterOptions.find(
    (op) => store.eventList.selectedFilter === op.id
  );
const selectActiveEventListId = createSelector(
  [selectEventList, selectRouterLocation],
  (events, location) => {
    const { pathname } = location;
    const [, resource, index] = pathname.split('/');
    const routeIndex = parseInt(index, 10);

    if (resource !== 'event') {
      return -1;
    }

    const hasEvent = events.find((e) => e.id === routeIndex);

    return hasEvent ? routeIndex : -1;
  }
);
const selectGroupedByCategoryId = createSelector([selectEventList], (events) =>
  events.reduce((acc, { eventCategoryId, ...rest }) => {
    const ec = acc[eventCategoryId];
    return ec
      ? { ...acc, [eventCategoryId]: [...ec, rest] }
      : { ...acc, [eventCategoryId]: [rest] };
  }, {})
);
const selectIsLoading = (store: Store) => store.eventList.loading;

export const selectors = {
  selectEventList,
  selectVisibleEvents,
  selectEventListSearchFilter,
  selectCurrentFilterOption,
  selectActiveEventListId,
  selectGroupedByCategoryId,
  selectIsLoading,
};
