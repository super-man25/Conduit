import { actions, reducer } from '_state/alert';
import {
  SUCCESS,
  ERROR,
  CLEAR,
  SUCCESS_ASYNC,
  ERROR_ASYNC,
} from '_state/alert/actions';
import { successAlertAsync, errorAlertAsync } from '_state/alert/saga';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { delay, put } from 'redux-saga/effects';

describe('actions', () => {
  it('should create an action for a success message', () => {
    const message = 'message';
    const action = actions.success(message);
    expect(action).toEqual({
      type: SUCCESS_ASYNC,
      payload: { message },
    });
  });

  it('should create an action for an error message', () => {
    const message = 'message';
    const action = actions.error(message);
    expect(action).toEqual({
      type: ERROR_ASYNC,
      payload: message,
    });
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});

    expect(state).toEqual({
      type: null,
      message: null,
    });
  });

  it('should handle SUCCESS', () => {
    const prevState = {
      type: null,
      message: null,
    };

    const message = 'message';
    const nextState = reducer(prevState, { type: SUCCESS, payload: message });

    expect(nextState).toEqual({
      type: 'apiSuccess',
      message,
    });
  });

  it('should handle ERROR', () => {
    const prevState = {
      type: null,
      message: null,
    };

    const message = 'message';
    const nextState = reducer(prevState, { type: ERROR, payload: message });

    expect(nextState).toEqual({
      type: 'apiError',
      message,
    });
  });

  it('should handle CLEAR', () => {
    const prevState = {
      type: 'apiSuccess',
      message: 'message',
    };

    const nextState = reducer(prevState, { type: CLEAR });

    expect(nextState).toEqual({
      type: null,
      message: null,
    });
  });
});

describe('saga workers', () => {
  it('should handle success', () => {
    const message = 'It worked!';
    const action = actions.success(message);
    const generator = cloneableGenerator(successAlertAsync)(action);
    expect(generator.next().value).toEqual(
      put({ type: SUCCESS, payload: message })
    );
    expect(generator.next().value).toEqual(delay(3000));
    expect(generator.next().value).toEqual(put({ type: CLEAR }));
  });

  it('should handle error', () => {
    const message = 'It failed :-(';
    const action = actions.error(message);
    const generator = cloneableGenerator(errorAlertAsync)(action);
    expect(generator.next().value).toEqual(
      put({ type: ERROR, payload: message })
    );
    expect(generator.next().value).toEqual(delay(3000));
    expect(generator.next().value).toEqual(put({ type: CLEAR }));
  });
});
