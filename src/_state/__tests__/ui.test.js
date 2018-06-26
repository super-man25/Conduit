import reducer, { initialState, actions, types, selectors } from '../ui';

describe('actions', () => {
  it('should create an action to toggle the sidebar', () => {
    expect(actions.toggleSidebar()).toEqual({ type: types.SIDEBAR_TOGGLE });
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should handle SIDEBAR_TOGGLE actions', () => {
    const prevState = {
      sidebarIsOpen: false
    };

    const action = { type: types.SIDEBAR_TOGGLE };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      sidebarIsOpen: true
    });
  });
});

describe('selectors', () => {
  it('selectIsSidebarOpen selector should return whether the sidebar is open', () => {
    const store = {
      ui: {
        sidebarIsOpen: true
      }
    };

    expect(selectors.selectIsSidebarOpen(store)).toEqual(true);
  });
});
