/**
 * Normalize MlB Team Stats from api
 *
 * @param {Object} rawMLBTeamStat - mlbTeamStat record from API
 * @return {Object} normalized mlbTeamStat
 */
export function normalize(rawMLBTeamStat) {
    const {
      id,
      createdAt,
      modifiedAt,
      clientId,
      wins,
      losses,
      gamesRemaining
    } = rawMLBTeamStat;
  
    return {
      id,
      createdAt: createdAt ? new Date(createdAt) : createdAt,
      modifiedAt: modifiedAt ? new Date(modifiedAt) : modifiedAt,
      clientId,
      wins,
      losses,
      gamesRemaining
    };
  }
  