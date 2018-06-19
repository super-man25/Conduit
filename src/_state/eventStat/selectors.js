// @flow
import type { EventStatState } from './reducer';
import type { DateRange } from '_helpers/types';

type State = {
  eventStat: EventStatState
};

export const getEventStats = (state: State) => state.eventStat.eventStats;
export const getEventStatFilterArguments = (state: State) =>
  state.eventStat.dateRange;
export const getEventStatDateLimits = (state: State): DateRange =>
  state.eventStat.eventDateLimits;
