/**
 * Normalize Team Stats from api
 *
 * @param {Object} rawTeamStat - teamStat record from API
 * @return {Object} normalized teamStat
 */
export function normalize(rawTeamStat) {
  const {
    id,
    createdAt,
    modifiedAt,
    clientId,
    wins,
    losses,
    gamesTotal
  } = rawTeamStat;

  return {
    id,
    createdAt: createdAt ? new Date(createdAt) : createdAt,
    modifiedAt: modifiedAt ? new Date(modifiedAt) : modifiedAt,
    clientId,
    wins,
    losses,
    gamesTotal
  };
}
