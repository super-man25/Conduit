// @flow

import { get } from '_helpers/api';
import { isoDateFormat } from '_helpers';

type DateRange = { start?: Date, end: Date };

function formatDateParams({ start, end, ...rest }: any) {
  const res = { ...rest };
  if (start) res.startDate = isoDateFormat(start);
  if (end) res.endDate = isoDateFormat(end);
  res.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return res;
}

type TimeStatsRequest = DateRange &
  ({ seasonId: number } | { eventId: number });

function getAll(params: TimeStatsRequest) {
  return get('timeStats', formatDateParams(params));
}

export const eventStatService = {
  getAll,
};
