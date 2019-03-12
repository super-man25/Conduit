// @flow
import { get, put, post } from '_helpers/api';
import { getYear } from 'date-fns';
import type { EDEvent, EDInventoryRow } from '_models';
import { denormalize } from './normalizers/event';

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

function updatePercentPriceModifier(
  eventId: number,
  percentPriceModifier: number
) {
  return denormalize({ percentPriceModifier }).then((payload) => {
    return put(`events/${eventId}/priceModifier`, payload).catch(
      handleResponseError
    );
  });
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

function updateEventSeats(payload: {
  eventSeatIds: Array<number>,
  overridePrice?: number,
  isListed?: boolean
}) {
  return post('eventRows/_bulk', payload);
}

function handleResponseError(error) {
  switch (error.code) {
    default:
      error.toString = () => 'Error saving price modification';
  }
  throw error;
}

export const eventService = {
  getAll,
  getOne,
  toggleBroadcasting,
  getInventory,
  updateEventSeats,
  updatePercentPriceModifier
};
