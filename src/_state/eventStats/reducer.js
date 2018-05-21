// @flow
import {
  FETCH_ASYNC,
  FETCH_SUCCESS,
  FETCH_ERROR,
  RESET,
  SET_GROUPING_FILTER,
  SET_FIRST_AND_LAST_DATE,
  SET_DATE_RANGE
} from './actions';
import type { Action } from './actions';
import type { EventStat } from '_models/EventStats.model';
import type { Filter, DateRange } from '_helpers/types';

export type EventStatState = {
  loading: boolean,
  eventStats: EventStat[],
  groupFilters: Filter[],
  selectedGroupFilter: number,
  eventDateLimits: DateRange,
  dateRange: DateRange
};

// When there is an endpoint to get first/last date, replace eventDateLimits
export const initialState: EventStatState = {
  loading: false,
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
    from: new Date('2018-04-30T19:28:43+00:00'),
    to: new Date('2018-06-05T19:28:43+00:00')
  }
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
    default:
      return state;
  }
}
