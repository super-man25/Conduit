// @flow

import type { EDScheduledJob } from './scheduledJob';

type Factors = {
  eventScore: ?number,
  eventScoreModifier: number,
  spring: ?number,
  springModifier: number,
  velocityFactor: number,
};

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
  soldInventory: number,
  unsoldInventory: number,
  revenue: number,
  percentPriceModifier: number,
  factors: Factors,
  timeZone: string,
  scheduledJob: EDScheduledJob,
};
