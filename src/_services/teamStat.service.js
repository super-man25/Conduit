import { get } from '_helpers/api';

function getStats() {
  return get('teamStatistics');
}

export const teamStatService = {
  getStats
};
