// @flow
import { format, distanceInWords, distanceInWordsToNow } from 'date-fns';

/**
 * Return a date as a string
 *
 * @param {Date} d - date to format
 */
export function readableDate(d: Date): string {
  return format(d, 'ddd, M/DD/YY @ h:mmA');
}

/**
 * Given two dates, generate a human readable time duration
 *
 * @param {Date} t1 - time in question
 * @param {Date} t0 - time to compare
 * @return {string}
 */
export function readableDuration(t1: Date, t0?: Date): string {
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
export function orDash(value: any): string {
  return value !== undefined && value !== null ? value : '--';
}

/**
 * Given a number, format it as USD. Limits value to cents
 * @param {number} value
 */
export function formatUSD(value: number): string {
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
export function validateEmail(email: any): boolean {
  const emailRegex = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
  const emailOK = emailRegex.test(email);
  return emailOK;
}

/**
 * Validate Phone Number
 *
 * @param {any} phoneNumber
 */
export function validatePhoneNumber(phoneNumber: any): boolean {
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
export function sentenceCase(str: string): string {
  if (typeof str !== 'string') return '';

  return str.toLowerCase().replace(str[0], str[0].toUpperCase());
}

/**
 * Format string as title case eg This is a Title...
 *
 * @param {string} str
 */
export function titleCase(str: string): string {
  if (typeof str !== 'string') return '';

  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.replace(word[0], word[0].toUpperCase()))
    .join(' ');
}

// Helper for truncateNumber
const fixToTwoDecimals = (num: number) => num.toFixed(2).replace(/[.,]00$/, '');

/**
 * Truncate a number to a common string representation. 1000 -> 1k, 1000000 -> 1M
 * and truncate to at most 2 decimal places
 */
export function truncateNumber(value: number): string {
  if (Math.abs(value) >= 1000000) {
    return `${fixToTwoDecimals(value / 1000000)}M`;
  } else if (Math.abs(value) >= 1000) {
    return `${fixToTwoDecimals(value / 1000)}k`;
  } else {
    return `${fixToTwoDecimals(value)}`;
  }
}
