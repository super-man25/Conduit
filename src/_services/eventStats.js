// @flow

import { get } from '_helpers/api';
import { toScalaDate } from '_helpers';

type EventTimeStatsParams = {
  eventId: number,
  startTime?: string,
  endTime?: string
};

// start/end/eventId will be used when service is built
function getAll(eventId: number = 1, start: ?Date, end: ?Date) {
  let params: EventTimeStatsParams = { eventId };
  if (start) params.startTime = toScalaDate(start);
  if (end) params.endTime = toScalaDate(end);

  return get('timeStats', params).then((data) =>
    data.map((eventTimeStat: { timestamp: Date }) => ({
      ...eventTimeStat,
      date: eventTimeStat.timestamp
        ? new Date(eventTimeStat.timestamp)
        : eventTimeStat.timestamp
    }))
  );
}

export const eventStatService = {
  getAll
};
