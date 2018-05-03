import { format, distanceInWords } from 'date-fns';

/**
 * Return a date as a string
 *
 * @param {Date} d - date to format
 */
export function readableDate(d) {
  return format(d, 'ddd, M/DD/YY @ h:mmA');
}

/**
 * Given two dates, generate a human readable time duration
 *
 * @param {Date} t1 - time in question
 * @param {Date} t0 - time to compare (defaults to now)
 * @return {string}
 */
export function readableDuration(t1, t0 = new Date()) {
  return distanceInWords(t1, t0);
}

/**
 * Fill with dashes if the value is null or undefined
 *
 * @param {any} value
 */
export function orDash(value) {
  return value !== undefined && value !== null ? value : '--';
}
