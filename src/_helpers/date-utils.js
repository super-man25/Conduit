//@flow
import { isBefore, subMinutes, parseISO } from 'date-fns';

import { Event } from '_models';

/**
 * Check if the event timestamp passed more than an hour ago
 */
export function isPastEvent(event: Event) {
  const pastHour = subMinutes(new Date(), 60);
  return isBefore(parseISO(event.timestamp), pastHour);
}
