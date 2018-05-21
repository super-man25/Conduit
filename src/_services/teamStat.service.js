import { normalize } from './teamStat.normalize';
import { get } from '../_helpers/api';

function getStats() {
  return get('teamStatistics').then((data) => normalize(data));
}

export const teamStatService = {
  getStats
};
