// @flow

export type EventStat = {
  eventId: number,
  id: number,
  inventory: number,
  periodicInventory: number,
  revenue: number,
  periodicRevenue: number,
  isProjected: boolean,
  date: Date,
  timestamp: number
};
