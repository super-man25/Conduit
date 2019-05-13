// @flow
import {
  FETCH_ASYNC,
  FETCH_SUCCESS,
  FETCH_ERROR,
  RESET,
  SET_GROUPING_FILTER,
  SET_FIRST_AND_LAST_DATE,
  SET_DATE_RANGE,
  DOWNLOAD_SEASON_REPORT,
  DOWNLOAD_SEASON_REPORT_SUCCESS,
  DOWNLOAD_SEASON_REPORT_ERROR
} from './actions';
import type { Action } from './actions';
import type { EventStat } from '_models';
import type { Filter, DateRange } from '_helpers/types';

export type SeasonStatState = {
  +loading: boolean,
  +downloading: boolean,
  +seasonStats: EventStat[],
  +groupFilters: Filter[],
  +selectedGroupFilter: number,
  +dateLimits: DateRange,
  +eventDateLimits: DateRange,
  +dateRange: DateRange,
  +error: ?Error
};

// When there is an endpoint to get first/last date, replace eventDateLimits
export const initialState: SeasonStatState = {
  loading: false,
  downloading: false,
  seasonStats: [],
  groupFilters: [
    { label: 'Periodic', value: 0 },
    { label: 'Cumulative', value: 1 }
  ],
  selectedGroupFilter: 0,
  dateRange: {
    from: null,
    to: null
  },
  dateLimits: {
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
  state: SeasonStatState = initialState,
  action: Action
): SeasonStatState {
  switch (action.type) {
    case FETCH_ASYNC:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        seasonStats: action.payload
      };
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
        dateLimits: { ...action.payload },
        dateRange: { ...action.payload }
      };
    case DOWNLOAD_SEASON_REPORT:
      return { ...state, downloading: true };
    case DOWNLOAD_SEASON_REPORT_SUCCESS:
      return { ...state, downloading: false };
    case DOWNLOAD_SEASON_REPORT_ERROR:
      return { ...state, downloading: false, error: action.payload };
    default:
      return state;
  }
}
