// @flow
import { createActionTypeCreator } from '_helpers';

const reducerName = 'ui';
const createActionType = createActionTypeCreator(reducerName);

// State/Reducer
type State = {
  +sidebarIsOpen: boolean
};

export const initialState: State = {
  sidebarIsOpen: true
};

type Store = {
  ui: State
};

export default function reducer(
  state: State = initialState,
  action: Object = {}
) {
  switch (action.type) {
    case SIDEBAR_TOGGLE:
      return { ...state, sidebarIsOpen: !state.sidebarIsOpen };
    default:
      return state;
  }
}

// Selectors
const selectIsSidebarOpen = (state: Store) => state[reducerName].sidebarIsOpen;

// Action Types
const SIDEBAR_TOGGLE = createActionType('SIDEBAR_TOGGLE');

// Actions
const toggleSidebar = () => ({ type: SIDEBAR_TOGGLE });

// exports
export const types = { SIDEBAR_TOGGLE };
export const actions = { toggleSidebar };
export const selectors = { selectIsSidebarOpen };
