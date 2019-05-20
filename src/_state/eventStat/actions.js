// @flow
import { EDReportPayload } from '_models';

// Constants
export const FETCH_ASYNC = 'eventStat/FETCH_ASYNC';
export const FETCH_ERROR = 'eventStat/FETCH_ERROR';
export const FETCH_SUCCESS = 'eventStat/FETCH_SUCCESS';
export const RESET = 'eventStat/RESET';
export const SET_GROUPING_FILTER = 'eventStat/SET_GROUPING_FILTER';
export const SET_FIRST_AND_LAST_DATE = 'eventStat/SET_FIRST_AND_LAST_DATE';
export const SET_DATE_RANGE = 'eventStat/SET_DATE_RANGE';
export const DOWNLOAD_EVENT_REPORT = 'seasonStat/DOWNLOAD_EVENT_REPORT';
export const DOWNLOAD_EVENT_REPORT_SUCCESS =
  'seasonStat/DOWNLOAD_EVENT_REPORT_SUCCESS';
export const DOWNLOAD_EVENT_REPORT_ERROR =
  'seasonStat/DOWNLOAD_EVENT_REPORT_ERROR';

type EventStatParams = {
  eventId: number,
  start: ?Date,
  end: ?Date
};

export type Action =
  | { type: typeof FETCH_ASYNC, payload?: EventStatParams }
  | { type: typeof FETCH_ERROR, payload?: Error }
  | { type: typeof FETCH_SUCCESS, payload: any }
  | { type: typeof RESET }
  | { type: typeof SET_GROUPING_FILTER, payload: number }
  | { type: typeof SET_DATE_RANGE, payload: { from: ?Date, to: ?Date } }
  | {
      type: typeof SET_FIRST_AND_LAST_DATE,
      payload: { from: ?Date, to: ?Date }
    }
  | { type: typeof DOWNLOAD_EVENT_REPORT, payload: EDReportPayload }
  | { type: typeof DOWNLOAD_EVENT_REPORT_SUCCESS, payload: any }
  | { type: typeof DOWNLOAD_EVENT_REPORT_ERROR, payload?: Error };

// Action creators
function fetch(eventStatParams?: EventStatParams): Action {
  return {
    type: FETCH_ASYNC,
    payload: eventStatParams
  };
}

function clear(): Action {
  return {
    type: RESET
  };
}

function setGroupFilter(filter: number): Action {
  return {
    type: SET_GROUPING_FILTER,
    payload: filter
  };
}

function setDateRange(dateRange: { from: ?Date, to: ?Date }): Action {
  return {
    type: SET_DATE_RANGE,
    payload: dateRange
  };
}

const downloadEventReport = (payload: EDReportPayload) => ({
  type: DOWNLOAD_EVENT_REPORT,
  payload
});

export default {
  fetch,
  clear,
  setGroupFilter,
  setDateRange,
  downloadEventReport
};
