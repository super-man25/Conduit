// @flow
import { get } from '_helpers/api';
import type { EDIntegrationStat } from '_models';

function getAll(seasonId: number): Promise<EDIntegrationStat[]> {
  return get('integrationStats', { seasonId });
}

export const integrationStatService = {
  getAll
};
