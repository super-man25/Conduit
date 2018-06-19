// @flow
import type { SeasonStatState } from './reducer';
import type { DateRange } from '_helpers/types';

type State = {
  seasonStat: SeasonStatState
};

export const getSeasonStats = (state: State) => state.seasonStat.seasonStats;
export const getSeasonStatFilterArguments = (state: State) =>
  state.seasonStat.dateRange;
export const getSeasonStatDateLimits = (state: State): DateRange =>
  state.seasonStat.dateLimits;
