import { createSelector } from 'reselect';

export const getEvents = (state) => state.event.events;

export const getLocation = (state) => state.router.location;

export const getSearchFilter = (state) => state.event.filter;

export const getActiveEventId = createSelector(
  [getEvents, getLocation],
  (events, location) => {
    const { pathname } = location;
    const [, resource, index] = pathname.split('/');
    const routeIndex = parseInt(index, 10);

    if (resource !== 'event') {
      return -1;
    }

    const hasEvent = events.find((e) => e.id === routeIndex);

    return hasEvent ? routeIndex : -1;
  }
);

export const getActiveEvent = createSelector(
  [getEvents, getActiveEventId],
  (events, activeEventId) => {
    return events.find((e) => e.id === activeEventId);
  }
);

export const getTogglingBroadcasting = (state) =>
  state.event.isTogglingBroadcasting;
