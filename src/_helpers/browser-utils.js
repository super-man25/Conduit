import { mobileBreakpoint } from '_constants';

export const isMobileDevice =
  document.body && document.body.clientWidth <= mobileBreakpoint;
