import { format, distanceInWords, distanceInWordsToNow } from 'date-fns';

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
 * @param {Date} t0 - time to compare
 * @return {string}
 */
export function readableDuration(t1, t0) {
  if (!t0) {
    return distanceInWordsToNow(t1);
  }

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
 * Given a number, format it as USD. Limits value to cents
 * @param {number} value
 */
export function formatUSD(value) {
  const formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return formatter.format(value);
}

/*
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

/**
 * Format string as sentence case eg This is a sentence...
 *
 * @param {string} str
 */
export function sentenceCase(str) {
  if (typeof str !== 'string') return '';

  return str.toLowerCase().replace(str[0], str[0].toUpperCase());
}

/**
 * Format string as title case eg This is a Title...
 *
 * @param {string} str
 */
export function titleCase(str) {
  if (typeof str !== 'string') return '';

  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.replace(word[0], word[0].toUpperCase()))
    .join(' ');
}
