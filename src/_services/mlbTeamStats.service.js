import { normalize } from './mlbTeamStats.normalize';
import { get } from '../_helpers/api';

function getStats() {
  return get('mlb/teamStats', {}).then((data) => data.map(normalize));
}

export const mlbTeamStatsService = {
    getStats
};
