// @flow
import { get } from '_helpers/api';
import type { EDIntegrationStat } from '_models';

type GetAllParams = { seasonId: number } | { eventId: number };

function getAll(params: GetAllParams): Promise<EDIntegrationStat[]> {
  return get('integrationStats', params);
}

export const integrationStatService = {
  getAll
};
