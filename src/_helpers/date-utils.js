//@flow
import { isBefore, subMinutes } from 'date-fns';
import { Event } from '_models';

/**
 * Check if the event timestamp passed more than an hour ago
 */
export function isPastEvent(event: Event) {
  const pastHour = subMinutes(new Date(), 60);
  return isBefore(event.timestamp, pastHour);
}
