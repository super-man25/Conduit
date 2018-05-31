// @flow
export const SIDEBAR_TOGGLE = 'ui/SIDEBAR_TOGGLE';

export type Action = { type: typeof SIDEBAR_TOGGLE };

function toggleSidebar() {
  return {
    type: SIDEBAR_TOGGLE
  };
}

export default { toggleSidebar };
