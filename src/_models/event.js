// @flow

import type { EDScheduledJob } from './scheduledJob';

export type EDEvent = {
  clientId: number,
  createdAt: Date,
  eventCategoryId: number,
  id: number,
  integrationId: number,
  modifiedAt: Date,
  name: string,
  seasonId: number,
  timestamp: Date,
  venueId: number,
  isBroadcast: boolean,
  totalInventory: number,
  unsoldInventory: number,
  percentPriceModifier: number,
  eventScore: number,
  eventScoreModifier: number,
  spring: number,
  springModifier: number,
  scheduledJob: EDScheduledJob
};
