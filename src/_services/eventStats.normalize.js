/**
 * Normalize event from api
 *
 * @param {Object} rawEvent - eventTimeStat record from API
 * @return {Object} normalized eventTimeStat
 */
export function normalize(rawEvent) {
  const {
    id,
    createdAt,
    modifiedAt,
    date,
    inventory,
    revenue,
    isProjected,
    eventId
  } = rawEvent;

  return {
    id,
    createdAt,
    modifiedAt,
    date: date ? new Date(date) : date,
    inventory,
    revenue,
    isProjected,
    eventId
  };
}
