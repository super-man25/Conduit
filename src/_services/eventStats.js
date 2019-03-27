// @flow

import { get } from '_helpers/api';

type DateRange = { start?: Date, end: Date };

function formatDateParams({ start, end, ...rest }) {
  const res = { ...rest };
  if (start) res.startTime = start.toISOString();
  if (end) res.endTime = end.toISOString();

  return res;
}

type TimeStatsRequest = DateRange &
  ({ seasonId: number } | { eventId: number });

function getAll(params: TimeStatsRequest) {
  return get('timeStats', formatDateParams(params));
}

export const eventStatService = {
  getAll
};
