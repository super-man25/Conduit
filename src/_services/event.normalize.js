/**
 * Normalize event from api
 *
 * @param {Object} rawEvent - event record from API
 * @return {Object} normalized event
 */
export function normalize(rawEvent) {
  const {
    id,
    createdAt,
    modifiedAt,
    name,
    timestamp,
    clientId,
    venueId
  } = rawEvent;

  return {
    id,
    name,
    createdAt: createdAt ? new Date(createdAt) : createdAt,
    modifiedAt: modifiedAt ? new Date(modifiedAt) : modifiedAt,
    timestamp: timestamp ? new Date(timestamp) : timestamp,
    clientId,
    venueId
  };
}

