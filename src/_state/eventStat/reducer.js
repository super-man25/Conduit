// @flow
import {
  FETCH_ASYNC,
  FETCH_SUCCESS,
  FETCH_ERROR,
  RESET,
  SET_GROUPING_FILTER,
  SET_FIRST_AND_LAST_DATE,
  SET_DATE_RANGE,
  DOWNLOAD_EVENT_REPORT,
  DOWNLOAD_EVENT_REPORT_SUCCESS,
  DOWNLOAD_EVENT_REPORT_ERROR
} from './actions';
import type { Action } from './actions';
import type { EventStat } from '_models';
import type { Filter, DateRange } from '_helpers/types';

export type EventStatState = {
  +loading: boolean,
  +downloading: boolean,
  +eventStats: EventStat[],
  +groupFilters: Filter[],
  +selectedGroupFilter: number,
  +eventDateLimits: DateRange,
  +dateRange: DateRange,
  +error: ?Error
};

// When there is an endpoint to get first/last date, replace eventDateLimits
export const initialState: EventStatState = {
  loading: false,
  downloading: false,
  eventStats: [],
  groupFilters: [
    { label: 'Periodic', value: 0 },
    { label: 'Cumulative', value: 1 }
  ],
  selectedGroupFilter: 0,
  dateRange: {
    from: null,
    to: null
  },
  eventDateLimits: {
    from: null,
    to: null
  },
  error: null
};

export default function eventStatReducer(
  state: EventStatState = initialState,
  action: Action
): EventStatState {
  switch (action.type) {
    case FETCH_ASYNC:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
      return { ...state, loading: false, eventStats: action.payload };
    case FETCH_ERROR:
      return { ...state, loading: false };
    case RESET:
      return initialState;
    case SET_GROUPING_FILTER:
      return { ...state, selectedGroupFilter: action.payload };
    case SET_DATE_RANGE:
      return { ...state, dateRange: action.payload };
    case SET_FIRST_AND_LAST_DATE:
      return {
        ...state,
        eventDateLimits: { ...action.payload },
        dateRange: { ...action.payload }
      };
    case DOWNLOAD_EVENT_REPORT:
      return { ...state, downloading: true };
    case DOWNLOAD_EVENT_REPORT_SUCCESS:
      return { ...state, downloading: false };
    case DOWNLOAD_EVENT_REPORT_ERROR:
      return { ...state, downloading: false, error: action.payload };
    default:
      return state;
  }
}
