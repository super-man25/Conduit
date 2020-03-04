/* color reference here: https://www.dropbox.com/s/c59shyz4rhyufkk/color%20palette.xd?dl=0 */

export const colors = {
  black: '#002',
  white: '#fff',
  blue: '#007',
  darkBlue: '#004',
  lightBlue: '#44b',
  red: '#b44',
  green: '#3a3',
  orange: '#fa3',
  purple: '#a3f',
  neonBlue: '#3af',
  gray: '#667',
  lightGray: '#ddd',
  whiteSmoke: '#f5f5f5',
};

export const shadows = {
  ACTIVE_BUTTON: '0 0 3px rgba(56, 169, 219, 100)',
  SMALL: '0 1px 5px rgba(0, 0, 0, 0.1)',
  MEDIUM: '0 1px 10px rgba(0, 0, 0, 0.15)',
  LARGE: '0 1px 15px rgba(0, 0, 0, 0.15)',
};

const BASE = 1000;
const OVERLAY = BASE + 100;

export const zIndexes = {
  BASE,
  DROPDOWN_FILTER: BASE + 1,
  POPOVER: BASE + 2,
  OVERLAY,
  DROPDOWN_CLIENT_HEADER: OVERLAY + 1,
};

export const navigationHeight = 70;

export const mobileBreakpoint = 1024;

export const containerPadding = 25;
