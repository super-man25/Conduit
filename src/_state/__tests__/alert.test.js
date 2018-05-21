import { actions, reducer } from '_state/alert';

import { SUCCESS, ERROR, CLEAR } from '_state/alert/actions';

describe('actions', () => {
  it('should create an action for a success message', () => {
    const message = 'message';
    const action = actions.success(message);
    expect(action).toEqual({
      type: SUCCESS,
      payload: message
    });
  });

  it('should create an action for an error message', () => {
    const message = 'message';
    const action = actions.error(message);
    expect(action).toEqual({
      type: ERROR,
      payload: message
    });
  });

  it('should create an action to clear the message', () => {
    const action = actions.clear();
    expect(action).toEqual({
      type: CLEAR
    });
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});

    expect(state).toEqual({
      show: false,
      type: null,
      message: null
    });
  });

  it('should handle SUCCESS', () => {
    const prevState = {
      show: false,
      type: null,
      message: null
    };

    const message = 'message';
    const action = actions.success(message);
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      show: true,
      type: 'alert-success',
      message
    });
  });

  it('should handle ERROR', () => {
    const prevState = {
      show: false,
      type: null,
      message: null
    };

    const message = 'message';
    const action = actions.error(message);
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      show: true,
      type: 'alert-danger',
      message
    });
  });

  it('should handle CLEAR', () => {
    const prevState = {
      show: true,
      type: 'alert-success',
      message: 'message'
    };

    const action = actions.clear();
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      show: false,
      type: null,
      message: null
    });
  });
});
