// @flow
import { get } from '_helpers/api';
import type { EDTicketBreakdown } from '_models';

function getAll(payload: {
  seasonId?: number,
  eventId?: number
}): Promise<EDTicketBreakdown[]> {
  return get('revenueStats', payload);
}

function getOne(id: number): EDTicketBreakdown {
  return get(`/revenueStats/${id}`);
}

export const revenueStatsService = { getAll, getOne };
