// @flow

export type EventStatInterval = 'Days' | 'Hours';

export type EventStat = {
  eventId: number,
  id: number,
  inventory: ?number,
  projectedInventory: ?number,
  periodicInventory: ?number,
  projectedPeriodicInventory: ?number,
  revenue: ?number,
  projectedPeriodicRevenue: ?number,
  periodicRevenue: ?number,
  projectedPeriodicRevenue: ?number,
  isProjected: boolean,
  timestamp: number
};

export type EventStatsMeta = {
  timeZone: String,
  interval: EventStatInterval
};
