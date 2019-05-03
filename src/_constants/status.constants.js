// @flow
import { cssConstants } from './css.constants';
import { darken } from 'polished';

export type Status = 'success' | 'warn' | 'error' | 'info' | 'disabled';

const statusColorMap = {
  success: cssConstants.SECONDARY_GREEN,
  error: cssConstants.SECONDARY_RED,
  warn: darken(0.15, cssConstants.SECONDARY_YELLOW),
  info: cssConstants.SECONDARY_LIGHT_BLUE,
  disabled: cssConstants.PRIMARY_GRAY
};

export function colorForStatus(status: Status) {
  return statusColorMap[status];
}
