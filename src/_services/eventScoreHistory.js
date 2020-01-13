import { get } from '_helpers/api';
import { isoDateFormat } from '_helpers';

function getEventScoreHistory({ eventId, startDate, endDate }) {
  return get('eventScoreHistory', {
    eventId,
    startDate: isoDateFormat(startDate),
    endDate: isoDateFormat(endDate),
  });
}

export const eventScoreHistoryService = {
  getEventScoreHistory,
};
