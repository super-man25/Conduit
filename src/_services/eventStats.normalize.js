/**
 * Normalize event from api
 *
 * @param {Object} rawEvent - eventTimeStat record from API
 * @return {Object} normalized eventTimeStat
 */
export function normalize(rawEvent) {
  const { eventId, id, inventory, revenue, isProjected, timestamp } = rawEvent;

  return {
    eventId,
    id,
    inventory,
    revenue,
    isProjected,
    date: timestamp ? new Date(timestamp) : timestamp,
    timestamp: timestamp
  };
}
