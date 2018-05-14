import { normalize } from './mlbTeamStat.normalize';
import { get } from '../_helpers/api';

function getStats() {
  return get('mlb/teamStats').then((data) => normalize(data));
}

export const mlbTeamStatService = {
  getStats
};
