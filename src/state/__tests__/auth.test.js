import { put, call } from 'redux-saga/effects';
import { userService } from '_services';

import { actions, reducer } from 'state/auth';

import {
  signInAsync,
  signOutAsync,
  fetchAsync,
  updateAsync,
  changePasswordAsync,
  updateEmailAsync
} from 'state/auth/saga';

import {
  FETCH_ASYNC,
  IS_PENDING,
  SET_USER,
  SIGN_IN_ASYNC,
  SIGN_OUT_ASYNC,
  UPDATE_ASYNC,
  CHANGE_PASSWORD_ASYNC,
  UPDATE_SUCCESS,
  UPDATE_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  UPDATE_EMAIL_ASYNC,
  UPDATE_EMAIL_SUCCESS,
  UPDATE_EMAIL_ERROR
} from 'state/auth/actions';

import { SUCCESS } from 'state/alert/actions';

describe('actions', () => {
  it('should create an action to sign in', () => {
    const email = 'email@dom.com';
    const password = 'password';
    const action = actions.signIn(email, password);
    expect(action).toEqual({
      type: SIGN_IN_ASYNC,
      payload: { email, password }
    });
  });

  it('should create an action to sign out', () => {
    const action = actions.signOut();
    expect(action).toEqual({
      type: SIGN_OUT_ASYNC
    });
  });

  it('should create an action to fetch "me"', () => {
    const action = actions.fetch();
    expect(action).toEqual({
      type: FETCH_ASYNC
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
});

describe('reducer', () => {
  it('should return the initialState', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual({
      model: null,
      loading: true
    });
  });

  it('should handle SET_USER', () => {
    const prevState = {
      model: null,
      pending: false
    };

    const user = {
      id: 1,
      email: 'some@email.com'
    };

    const nextState = reducer(prevState, { type: SET_USER, payload: user });
    expect(nextState).toEqual({
      model: user,
      pending: false
    });
  });

  it('should handle IS_PENDING', () => {
    const prevState = {
      model: null,
      pending: false
    };

    const pending = true;

    const nextState = reducer(prevState, {
      type: IS_PENDING,
      payload: pending
    });
    expect(nextState).toEqual({
      model: null,
      loading: true,
      pending: false
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
  it('should handle sign in', () => {
    const user = { id: 1 };
    const action = actions.signIn('some@email.com', 'password');
    const generator = signInAsync(action);
    expect(generator.next().value).toEqual(
      call(userService.login, 'some@email.com', 'password')
    );
    expect(generator.next(user).value).toEqual(
      put({ type: SET_USER, payload: user })
    );
    expect(generator.next().done).toBe(true);
  });

  it('should handle sign out', () => {
    const action = actions.signOut();
    const generator = signOutAsync(action);
    expect(generator.next().value).toEqual(call(userService.logout));
    expect(generator.next().value).toEqual(
      put({ type: SET_USER, payload: null })
    );
    expect(generator.next().done).toBe(true);
  });

  it('should handle fetch', () => {
    const user = { id: 1 };
    const action = actions.fetch();
    const generator = fetchAsync(action);
    expect(generator.next().value).toEqual(
      put({ type: IS_PENDING, payload: true })
    );
    expect(generator.next().value).toEqual(call(userService.getMe));
    expect(generator.next(user).value).toEqual(
      put({ type: SET_USER, payload: user })
    );
    expect(generator.next().value).toEqual(
      put({ type: IS_PENDING, payload: false })
    );
    expect(generator.next().done).toBe(true);
  });

  it('should handle update contact info', () => {
    const user = { id: 1, email: 'test@dialexa.com' };
    const action = actions.update(user);
    const generator = updateAsync(action);
    expect(generator.next().value).toEqual(call(userService.update, user));
    expect(generator.next(user).value).toEqual(
      put({ type: UPDATE_SUCCESS, payload: user })
    );
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
    expect(generator.next().value).toEqual(
      put({ type: SUCCESS, payload: 'Successfully Updated Email' })
    );
    expect(generator.next().done).toBe(true);
  });
});
