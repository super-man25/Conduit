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

/**
 * Validate Email
 *
 * @param {any} email
 */
export function validateEmail(email) {
  const emailRegex = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
  const emailOK = emailRegex.test(email);
  return emailOK;
}

/**
 * Validate Phone Number
 *
 * @param {any} phoneNumber
 */
export function validatePhoneNumber(phoneNumber) {
  if (phoneNumber !== null) {
    const phoneNumberRegex = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
    const phoneNumberOk =
      phoneNumberRegex.test(phoneNumber) || phoneNumber.length === 0;
    return phoneNumberOk;
  }
  return true;
}
