// @flow

import { get, post, put } from '_helpers/api';
import {
  validateAdminModifiers,
  validateOverridePrice,
  validatePercentPriceModifier
} from './validators/event';
import type { EDEvent, EDInventoryRow } from '_models';

import type { EDPricingPreview } from '_models/pricingPreview';

type GetAllParams = { seasonId: number };

function getAll(params: GetAllParams): Promise<EDEvent[]> {
  return get('events', params);
}

function getOne(eventId: number): Promise<EDEvent> {
  return get(`events/${eventId}`);
}

function getPricingPreview(
  id: number,
  eventScore: number,
  spring: number
): Promise<EDPricingPreview> {
  return get(`events/${id}/pricingPreview`, {
    eventScore: eventScore.toFixed(2),
    spring: spring.toFixed(4)
  });
}

function getAutomatedSpringValue(id: number, eventScore: number): Promise<any> {
  return get(`events/${id}/spring`, { eventScore });
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
  return validatePercentPriceModifier({ percentPriceModifier }).then(
    (payload) => {
      return put(`events/${eventId}/priceModifier`, payload).catch(
        handleResponseError
      );
    }
  );
}

function updateAdminModifiers(
  eventId: number,
  eventScoreModifier: number,
  springModifier: number
) {
  return validateAdminModifiers({ eventScoreModifier, springModifier }).then(
    (payload) => {
      return put(`events/${eventId}/adminModifier`, payload).catch(
        handleResponseError
      );
    }
  );
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
  return validateOverridePrice(payload).then((denormalizedPayload) => {
    return post('eventRows/_bulk', denormalizedPayload);
  });
}

function handleResponseError(error) {
  switch (error.code) {
    case 400:
      error.toString = () => error.body.message;
      break;
    default:
      error.toString = () => 'Error saving modifier';
  }
  throw error;
}

export const eventService = {
  getAll,
  getInventory,
  getOne,
  getPricingPreview,
  toggleBroadcasting,
  updateAdminModifiers,
  updateEventSeats,
  updatePercentPriceModifier,
  getAutomatedSpringValue
};
