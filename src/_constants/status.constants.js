// @flow
import { cssConstants } from './css.constants';

export type Status = 'success' | 'warn' | 'error' | 'info' | 'disabled';

const statusColorMap = {
  success: cssConstants.SECONDARY_GREEN,
  error: cssConstants.SECONDARY_PURPLE,
  warn: cssConstants.SECONDARY_BURNT_ORANGE,
  info: cssConstants.SECONDARY_BLUE,
  disabled: cssConstants.PRIMARY_GRAY,
};

export function colorForStatus(status: Status) {
  return statusColorMap[status];
}
