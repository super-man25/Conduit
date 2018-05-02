import { cloneableGenerator } from 'redux-saga/utils';
import { call, put } from 'redux-saga/effects';
import { userService } from '_services';
import { actions, reducer } from 'state/users';

import {
  CREATE_ASYNC,
  CREATE_SUCCESS,
  CREATE_ERROR
} from 'state/users/actions';

import { createAsync } from 'state/users/saga';

describe('actions', () => {
  it('should create an action for create a user', () => {
    const user = { id: 1, name: 'Ed Dynamic' };
    const action = actions.create(user);
    expect(action).toEqual({
      type: CREATE_ASYNC,
      payload: user
    });
  });
});

describe('reducer', () => {
  it('should return initial state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual({
      creating: false
    });
  });

  it('should handle CREATE_ASYNC', () => {
    const prevState = {
      creating: false
    };

    const action = actions.create();
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      creating: true
    });
  });

  it('should handle CREATE_SUCCESS', () => {
    const prevState = {
      creating: true
    };

    const action = { type: CREATE_SUCCESS };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      creating: false
    });
  });

  it('should handle CREATE_ERROR', () => {
    const prevState = {
      creating: true
    };

    const action = { type: CREATE_ERROR };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      creating: false
    });
  });
});

describe('saga workers', () => {
  it('should handle create', () => {
    const user = { id: 1, name: 'Ed Dynamo' };
    const action = actions.create(user);
    const generator = cloneableGenerator(createAsync)(action);
    expect(generator.next().value).toEqual(call(userService.register, user));

    const success = generator.clone();
    expect(success.next().value).toEqual(put({ type: CREATE_SUCCESS }));

    const fail = generator.clone();
    const error = new Error('some API error');
    expect(fail.throw(error).value).toEqual(
      put({ type: CREATE_ERROR, payload: error })
    );
  });
});
