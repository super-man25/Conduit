// @flow
import { SIDEBAR_TOGGLE } from './actions';
import type { Action } from './actions';

type UIState = {
  +sidebarIsOpen: boolean
};

export const initialState: UIState = {
  sidebarIsOpen: true
};

export default function uiReducer(
  state: UIState = initialState,
  action: Action
): UIState {
  switch (action.type) {
    case SIDEBAR_TOGGLE:
      return { ...state, sidebarIsOpen: !state.sidebarIsOpen };
    default:
      return state;
  }
}
