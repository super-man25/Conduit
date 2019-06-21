// @flow

export type EventStat = {
  eventId: number,
  id: number,
  inventory: number,
  periodicInventory: number,
  revenue: number,
  periodicRevenue: number,
  isProjected: boolean,
  timestamp: number
};

export type EventStatsMeta = {
  timeZone: String,
  interval: 'Days' | 'Hours'
};
