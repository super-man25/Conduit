// @flow
import { get, put } from '_helpers/api';
import { getYear } from 'date-fns';
import type { EDEvent, EDInventoryRow } from '_models';

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

// Since rows Ids are computed from the three properties eventId+section+row and aren't
// returned from the server, we generate a computed id here instead of computing it.
// Remove if an Id starts getting generated on the server
const generateComputedInventoryRowId = (row: EDInventoryRow) => ({
  ...row,
  id: `${row.eventId}_${row.section}_${row.row}`
});

function getInventory(eventId: number): EDInventoryRow[] {
  return get(`eventRows`, { eventId }).then((rows) =>
    rows.map(generateComputedInventoryRowId)
  );
}

function setEventRowListed(id: number, isListed: boolean) {
  return true;
}

export const eventService = {
  getAll,
  getOne,
  toggleBroadcasting,
  getInventory,
  setEventRowListed
};
