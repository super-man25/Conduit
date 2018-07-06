// @flow

import { get } from '_helpers/api';
import { toScalaDate } from '_helpers';

type DateRange = { start?: Date, end: Date };

function formatDateParams({ start, end, ...rest }) {
  const res = { ...rest };
  if (start) res.startTime = toScalaDate(start);
  if (end) res.endTime = toScalaDate(end);

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
