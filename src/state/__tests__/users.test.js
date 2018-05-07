import { cloneableGenerator } from 'redux-saga/utils';
import { call, put } from 'redux-saga/effects';
import { userService } from '_services';
import { actions, reducer } from 'state/users';

import {
  CREATE_ASYNC,
  CREATE_SUCCESS,
  CREATE_ERROR,
  UPDATE_ASYNC,
  CHANGE_PASSWORD_ASYNC,
  UPDATE_SUCCESS,
  UPDATE_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  UPDATE_EMAIL_ASYNC,
  UPDATE_EMAIL_SUCCESS,
  UPDATE_EMAIL_ERROR
} from 'state/users/actions';

import {
  createAsync,
  updateAsync,
  changePasswordAsync,
  updateEmailAsync
} from 'state/users/saga';

import { SUCCESS } from 'state/alert/actions';
import { FETCH_ASYNC } from 'state/auth/actions';

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
      model: null,
      pending: false
    });
  });

  it('should handle CREATE_ASYNC', () => {
    const prevState = {
      model: null,
      pending: false
    };

    const action = actions.create();
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      model: null,
      pending: false,
      creating: true
    });
  });

  it('should handle CREATE_SUCCESS', () => {
    const prevState = {
      pending: true
    };

    const action = { type: CREATE_SUCCESS };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      pending: true,
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

  it('should create an action to update contact info', () => {
    const action = actions.update();
    expect(action).toEqual({
      type: UPDATE_ASYNC
    });
  });

  it('should create an action to change password', () => {
    const action = actions.changePassword();
    expect(action).toEqual({
      type: CHANGE_PASSWORD_ASYNC
    });
  });

  it('should create an action to update email', () => {
    const action = actions.updateEmail();
    expect(action).toEqual({
      type: UPDATE_EMAIL_ASYNC
    });
  });

  it('should handle UPDATE_ASYNC', () => {
    const prevState = {
      model: null,
      pending: false
    };

    const user = {
      id: 1,
      email: 'some@email.com'
    };

    const nextState = reducer(prevState, { type: UPDATE_ASYNC, payload: user });

    expect(nextState).toEqual({
      model: null,
      loading: true,
      pending: false
    });
  });

  it('should handle UPDATE_SUCCESS', () => {
    const prevState = {
      model: null,
      pending: false,
      loading: true
    };

    const user = {
      id: 1,
      email: 'some@email.com'
    };

    const nextState = reducer(prevState, {
      type: UPDATE_SUCCESS,
      payload: user
    });

    expect(nextState).toEqual({
      model: user,
      loading: false
    });
  });

  it('should handle UPDATE_ERROR', () => {
    const prevState = {
      model: null,
      pending: false,
      loading: true
    };

    const user = {
      id: 1,
      email: 'some@email.com'
    };

    const nextState = reducer(prevState, { type: UPDATE_ERROR, payload: user });

    expect(nextState).toEqual({
      model: null,
      loading: false,
      pending: false
    });
  });

  it('should handle UPDATE_EMAIL_ASYNC', () => {
    const prevState = {
      model: null,
      pending: false
    };

    const user = {
      id: 1,
      email: 'some@email.com'
    };

    const nextState = reducer(prevState, {
      type: UPDATE_EMAIL_ASYNC,
      payload: user
    });

    expect(nextState).toEqual({
      model: null,
      loading: true,
      pending: false
    });
  });

  it('should handle UPDATE_EMAIL_SUCCESS', () => {
    const prevState = {
      model: null,
      pending: false,
      loading: true
    };

    const user = {
      id: 1,
      email: 'some@email.com'
    };

    const nextState = reducer(prevState, {
      type: UPDATE_EMAIL_SUCCESS,
      payload: user
    });

    expect(nextState).toEqual({
      model: user,
      loading: false
    });
  });

  it('should handle UPDATE_EMAIL_ERROR', () => {
    const prevState = {
      model: null,
      pending: false,
      loading: true
    };

    const user = {
      id: 1,
      email: 'some@email.com'
    };

    const nextState = reducer(prevState, {
      type: UPDATE_EMAIL_ERROR,
      payload: user
    });

    expect(nextState).toEqual({
      model: null,
      loading: false,
      pending: false
    });
  });

  it('should handle CHANGE_PASSWORD_ASYNC', () => {
    const prevState = {
      model: null,
      pending: false
    };

    const user = {
      id: 1,
      email: 'some@email.com'
    };

    const nextState = reducer(prevState, {
      type: CHANGE_PASSWORD_ASYNC,
      payload: user
    });

    expect(nextState).toEqual({
      model: null,
      loading: true,
      pending: false
    });
  });

  it('should handle CHANGE_PASSWORD_SUCCESS', () => {
    const prevState = {
      model: null,
      pending: false,
      loading: true
    };

    const user = {
      id: 1,
      email: 'some@email.com'
    };

    const nextState = reducer(prevState, {
      type: CHANGE_PASSWORD_SUCCESS,
      payload: user
    });

    expect(nextState).toEqual({
      model: user,
      loading: false
    });
  });

  it('should handle CHANGE_PASSWORD_ERROR', () => {
    const prevState = {
      model: null,
      pending: false,
      loading: true
    };

    const user = {
      id: 1,
      email: 'some@email.com'
    };

    const nextState = reducer(prevState, {
      type: CHANGE_PASSWORD_ERROR,
      payload: user
    });

    expect(nextState).toEqual({
      model: null,
      loading: false,
      pending: false
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

  it('should handle update contact info', () => {
    const user = { id: 1, email: 'test@dialexa.com' };
    const action = actions.update(user);
    const generator = updateAsync(action);
    expect(generator.next().value).toEqual(call(userService.update, user));
    expect(generator.next(user).value).toEqual(
      put({ type: UPDATE_SUCCESS, payload: user })
    );
    expect(generator.next().value).toEqual(put({ type: FETCH_ASYNC }));
    expect(generator.next().value).toEqual(
      put({
        type: SUCCESS,
        payload: 'Successfully Updated Personal Information'
      })
    );
    expect(generator.next().done).toBe(true);
  });

  it('should handle change password', () => {
    const data = {
      id: 1,
      email: 'test@dialexa.com',
      password: '123456',
      newPassword: '654321'
    };
    const action = actions.changePassword(data);
    const generator = changePasswordAsync(action);
    expect(generator.next().value).toEqual(
      call(userService.changePassword, data)
    );
    expect(generator.next(data).value).toEqual(
      put({ type: CHANGE_PASSWORD_SUCCESS, payload: data })
    );
    expect(generator.next().value).toEqual(put({ type: FETCH_ASYNC }));
    expect(generator.next().value).toEqual(
      put({ type: SUCCESS, payload: 'Successfully Changed Password' })
    );
    expect(generator.next().done).toBe(true);
  });

  it('should handle update email', () => {
    const data = {
      id: 1,
      email: 'test@dialexa.com',
      password: '123456',
      newPassword: '654321'
    };
    const action = actions.updateEmail(data);
    const generator = updateEmailAsync(action);
    expect(generator.next().value).toEqual(call(userService.updateEmail, data));
    expect(generator.next(data).value).toEqual(
      put({ type: UPDATE_EMAIL_SUCCESS, payload: data })
    );
    expect(generator.next().value).toEqual(put({ type: FETCH_ASYNC }));
    expect(generator.next().value).toEqual(
      put({ type: SUCCESS, payload: 'Successfully Updated Email' })
    );
    expect(generator.next().done).toBe(true);
  });
});
