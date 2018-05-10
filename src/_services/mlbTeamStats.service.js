import { normalize } from './mlbTeamStats.normalize';
import { get } from '../_helpers/api';

function getStats() {
  return get('mlb/teamStats').then((data) => normalize(data));
}

export const mlbTeamStatsService = {
  getStats
};
