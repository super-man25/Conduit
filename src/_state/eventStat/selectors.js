// @flow
import type { EventStatState } from './reducer';
import type { DateRange } from '_helpers/types';

export const getModel = (state: EventStatState) => state.eventStats;
export const getFilterArguments = (state: EventStatState) => state.dateRange;
export const getDateLimits = (state: EventStatState): DateRange =>
  state.eventDateLimits;
