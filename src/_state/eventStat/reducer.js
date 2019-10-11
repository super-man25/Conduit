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
import type { EventStat, EventStatsMeta } from '_models';
import type { Filter, DateRange } from '_helpers/types';

export type EventStatState = {
  +loading: boolean,
  +downloading: boolean,
  +eventStats: EventStat[],
  +eventStatsMeta: ?EventStatsMeta,
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
  eventStatsMeta: null,
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

export function serialize(eventStats: EventStat[]) {
  const eventStatsProjections = eventStats
    .filter((e) => e.isProjected)
    .map((e) => {
      const negativeInventoryProjected = !e.inventory || e.inventory < 0;
      const projectedPeriodicInventory = negativeInventoryProjected
        ? e.periodicInventory - e.inventory
        : e.periodicInventory;
      return {
        timestamp: e.timestamp,
        projectedInventory: negativeInventoryProjected ? 0 : e.inventory,
        projectedRevenue: e.revenue,
        projectedPeriodicRevenue: e.periodicRevenue,
        projectedPeriodicInventory: projectedPeriodicInventory,
        isProjected: e.isProjected
      };
    });

  const eventStatsNoProjections = eventStats
    .filter((e) => !e.isProjected)
    .map((e) => ({
      timestamp: e.timestamp,
      inventory: e.inventory,
      revenue: e.revenue,
      periodicRevenue: e.periodicRevenue,
      periodicInventory: e.periodicInventory,
      isProjected: e.isProjected
    }));

  const serializedEventStats = [
    ...eventStatsNoProjections,
    ...eventStatsProjections
  ];

  return serializedEventStats;
}

export default function eventStatReducer(
  state: EventStatState = initialState,
  action: Action
): EventStatState {
  switch (action.type) {
    case FETCH_ASYNC:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        eventStats: serialize(action.payload.data),
        eventStatsMeta: action.payload.meta
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
