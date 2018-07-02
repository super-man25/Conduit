// @flow
import { get, put } from '_helpers/api';
import { getYear } from 'date-fns';
import type { EDEvent } from '_models';

type GetAllParams = {
  seasonId?: number,
  year?: Date
};

function getAll(
  params: GetAllParams = { year: getYear(new Date()) }
): Promise<EDEvent> {
  return get('events', params);
}

function toggleBroadcasting(
  eventId: number,
  isBroadcast: boolean
): Promise<{ modifiedAt: number, isBroadcast: boolean }> {
  return put(`events/${eventId}/toggle`, { isBroadcast });
}

export const eventService = {
  getAll,
  toggleBroadcasting
};
