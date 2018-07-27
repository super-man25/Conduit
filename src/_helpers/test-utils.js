/**
 * return a string with the ISO date as well as the format that was passed in.
 * This is an attempt to get around date-fns using the system timezone in CI
 *
 * @param {Date|Number} date
 * @param {String} format
 * @returns
 */
export function mockDateFnsFormat(date, format) {
  return `${new Date(date).toISOString()} @${format}`;
}