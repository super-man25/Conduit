// @flow
import {
  format,
  distanceInWords,
  distanceInWordsToNow,
  isToday,
  isThisYear
} from 'date-fns';
import { formatToTimeZone } from 'date-fns-timezone';
/**
 * Return a date as a string
 *
 * @param {Date} d - date to format
 * @param {*} timeZone - timeZone override, default system timezone
 */
export function readableDate(d: Date, timeZone: ?string): string {
  if (!timeZone) return format(d, 'ddd, M/DD/YY @ h:mmA');
  return formatToTimeZone(d, 'ddd, M/DD/YY @ h:mmA z', { timeZone });
}

/**
 * Return a date as a string with full day name
 *
 * @param {Date} d - date to format
 */
export function readableDateAndFullDay(d: Date): string {
  return format(d, 'dddd, M/DD/YY');
}

/**
 * Format date and time
 * *
 * @param {*} d - date to format
 * @param {*} timeZone - timeZone override, default system timezone
 */
export function readableDateAndTime(d: Date, timeZone: ?string) {
  if (!timeZone) return format(d, 'dddd, MMMM Do, YYYY @ h:mmA');
  return formatToTimeZone(d, 'dddd, MMMM Do, YYYY @ h:mmA z', { timeZone });
}

/**
 * Format a time with timezone
 * *
 * @param {*} d - date to format
 * @param {*} timeZone - timeZone override, default system timezone
 */

export function readableTime(d: Date, timeZone: ?string): string {
  if (!timeZone) return format(d, 'h:mmA');
  return formatToTimeZone(d, 'h:mmA z', { timeZone });
}

/**
 * Format a past date with precision based on how long ago the date was
 * *
 * @param {*} d - date to format
 * @param {*} timeZone - timeZone override, default system timezone
 */
export function readableTimeOrDate(d: Date, timeZone: ?string): string {
  if (isToday(d)) {
    if (!timeZone) return format(d, 'h:mmA');
    return formatToTimeZone(d, 'h:mmA', { timeZone });
  }

  if (isThisYear(d)) {
    return format(d, 'MMM D');
  }

  return format(d, 'M/DD/YY');
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
type USDFormatOptions = {
  minimumFractionDigits: number,
  maximumFractionDigits: number
};

export function formatUSD(
  value: number,
  options: USDFormatOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }
): string {
  const defaults = {
    style: 'currency',
    currency: 'USD'
  };

  const formatter = new Intl.NumberFormat('en-US', {
    ...defaults,
    ...options
  });

  return formatter.format(value);
}

/**
 * Return a number formatted to include commas at the correct place values
 */
export function formatNumber(value: number): string {
  if (isNaN(value) || value === null) {
    return '--';
  }

  return Intl.NumberFormat('en').format(value);
}

export function formatDecimal(
  value: number,
  decimalPoints: number = 2
): string {
  if (isNaN(value) || value === null) {
    return '--';
  }

  return value.toFixed(decimalPoints);
}

/*
 * Validate Email
 *
 * @param {any} email
 */
export function validateEmail(email: string): boolean {
  return /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/.test(email);
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

type DecimalValidationOptions = {
  decimalDigits: number,
  forceDecimal: boolean
};

export function validateDecimal(
  str: string,
  options: DecimalValidationOptions = { decimalDigits: 2, forceDecimal: false }
) {
  const { decimalDigits, forceDecimal } = options;
  const regExp = new RegExp(
    `^[-+]?([0-9]+)?([,.][0-9]{${decimalDigits}})${forceDecimal ? '' : '?'}$`
  );

  return regExp.test(str);
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

/**
 * Return a date as a string
 *
 * @param {string} a - primative comparison
 * @param {string} b - primative comparison
 */
const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base'
});

export const sortAlphaNum = (a: any, b: any) => {
  return collator.compare(a, b);
};
