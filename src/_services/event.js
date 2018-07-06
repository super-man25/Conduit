// @flow
import { get, put } from '_helpers/api';
import { getYear } from 'date-fns';
import type { EDEvent } from '_models';

type GetAllParams = { seasonId: number } | { year: Date };

function getAll(
  params: GetAllParams = { year: getYear(new Date()) }
): Promise<EDEvent[]> {
  return get('events', params);
}

function getOne(eventId: number): Promise<EDEvent> {
  return get(`events/${eventId}`);
}

type ToggleBroadcastingResponse = {
  modifiedAt: number,
  isBroadcast: boolean
};

function toggleBroadcasting(
  eventId: number,
  isBroadcast: boolean
): Promise<ToggleBroadcastingResponse> {
  return put(`events/${eventId}/toggle`, { isBroadcast });
}

export const eventService = {
  getAll,
  getOne,
  toggleBroadcasting
};
