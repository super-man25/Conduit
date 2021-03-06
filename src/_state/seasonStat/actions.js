// @flow
import { EDReportPayload } from '_models';

// Constants
export const FETCH_ASYNC = 'seasonStat/FETCH_ASYNC';
export const FETCH_ERROR = 'seasonStat/FETCH_ERROR';
export const FETCH_SUCCESS = 'seasonStat/FETCH_SUCCESS';
export const RESET = 'seasonStat/RESET';
export const SET_GROUPING_FILTER = 'seasonStat/SET_GROUPING_FILTER';
export const SET_FIRST_AND_LAST_DATE = 'seasonStat/SET_FIRST_AND_LAST_DATE';
export const SET_DATE_RANGE = 'seasonStat/SET_DATE_RANGE';
export const DOWNLOAD_SEASON_REPORT = 'seasonStat/DOWNLOAD_SEASON_REPORT';
export const DOWNLOAD_SEASON_REPORT_SUCCESS =
  'seasonStat/DOWNLOAD_SEASON_REPORT_SUCCESS';
export const DOWNLOAD_SEASON_REPORT_ERROR =
  'seasonStat/DOWNLOAD_SEASON_REPORT_ERROR';

type SeasonStatParams = {
  seasonId: number,
  start?: Date,
  end?: Date,
};

export type Action =
  | { type: typeof FETCH_ASYNC, payload?: SeasonStatParams }
  | { type: typeof FETCH_ERROR, payload?: Error }
  | { type: typeof FETCH_SUCCESS, payload: any }
  | { type: typeof RESET }
  | { type: typeof SET_GROUPING_FILTER, payload: number }
  | {
      type: typeof SET_DATE_RANGE,
      payload: { from: ?Date, to: ?Date },
    }
  | {
      type: typeof SET_FIRST_AND_LAST_DATE,
      payload: { from: ?Date, to: ?Date },
    }
  | { type: typeof DOWNLOAD_SEASON_REPORT, payload: EDReportPayload }
  | { type: typeof DOWNLOAD_SEASON_REPORT_SUCCESS, payload: any }
  | { type: typeof DOWNLOAD_SEASON_REPORT_ERROR, payload?: Error };

// Action creators
function fetch(seasonStatParams: SeasonStatParams): Action {
  return {
    type: FETCH_ASYNC,
    payload: seasonStatParams,
  };
}

function clear(): Action {
  return {
    type: RESET,
  };
}

function setGroupFilter(filter: number): Action {
  return {
    type: SET_GROUPING_FILTER,
    payload: filter,
  };
}

function setDateRange(dateRange: { from: ?Date, to: ?Date }): Action {
  return {
    type: SET_DATE_RANGE,
    payload: dateRange,
  };
}

const downloadSeasonReport = (payload: EDReportPayload) => ({
  type: DOWNLOAD_SEASON_REPORT,
  payload,
});

export default {
  fetch,
  clear,
  setGroupFilter,
  setDateRange,
  downloadSeasonReport,
};
