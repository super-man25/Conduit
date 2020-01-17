// @flow

import { isMobileDevice } from '_helpers';

// Action Types
const SIDEBAR_TOGGLE = 'ui/SIDEBAR_TOGGLE';

export type SidebarToggleAction = { type: 'ui/SIDEBAR_TOGGLE' };
export type Action = SidebarToggleAction;

// Actions
const toggleSidebar = (): SidebarToggleAction => ({ type: SIDEBAR_TOGGLE });

// State/Reducer
type State = {
  +sidebarIsOpen: boolean,
};

export const initialState: State = {
  sidebarIsOpen: !isMobileDevice,
};

type Store = {
  ui: State,
};

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case SIDEBAR_TOGGLE:
      return { ...state, sidebarIsOpen: !state.sidebarIsOpen };
    default:
      return state;
  }
}

// Selectors
const selectIsSidebarOpen = (state: Store): boolean => state.ui.sidebarIsOpen;

// exports
export const types = { SIDEBAR_TOGGLE };
export const actions = { toggleSidebar };
export const selectors = { selectIsSidebarOpen };
