import { userService } from '_services';
import { actions, reducer, initialState } from '_state/auth';
import { actions as alertActions } from '_state/alert';
import { actions as clientActions } from '_state/client';
import { types } from '_state/auth';
import {
  fetchAsync,
  signInAsync,
  signOutAsync,
  forgotPassAsync
} from '_state/auth/saga';
import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

describe('actions', () => {
  it('should create an action to sign in', () => {
    const email = 'email@dom.com';
    const password = 'password';
    const action = actions.signIn(email, password);
    expect(action).toEqual({
      type: types.SIGN_IN_ASYNC,
      payload: { email, password }
    });
  });

  it('should create an action to sign out', () => {
    const action = actions.signOut();
    expect(action).toEqual({
      type: types.SIGN_OUT_ASYNC
    });
  });

  it('should create an action to reset password', () => {
    const email = 'email@dom.com';
    const action = actions.forgotPass(email);
    expect(action).toEqual({
      type: types.FORGOT_PASS_ASYNC,
      payload: { email }
    });
  });

  it('should create an action to fetch "me"', () => {
    const action = actions.fetch();
    expect(action).toEqual({
      type: types.FETCH_ASYNC
    });
  });

  it('should create an action set the user', () => {
    const action = actions.setUser({ id: 1 });
    expect(action).toEqual({
      type: types.SET_USER,
      payload: { id: 1 }
    });
  });

  it('should create an action to unset the user', () => {
    const action = actions.unsetUser();
    expect(action).toEqual({
      type: types.UNSET_USER
    });
  });
});

describe('reducer', () => {
  it('should return the initialState', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should handle SET_USER', () => {
    const prevState = {
      ...initialState,
      model: null,
      loading: false
    };

    const user = { id: 1, email: 'some@email.com' };

    const action = {
      type: types.SET_USER,
      payload: user
    };

    const nextState = reducer(prevState, action);
    expect(nextState).toEqual({
      ...prevState,
      model: user,
      loading: false
    });
  });

  it('should handle UNSET_USER', () => {
    const prevState = {
      ...initialState,
      model: { id: 1 },
      loading: false
    };

    const action = { type: types.UNSET_USER };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({ ...prevState, model: null, loading: false });
  });

  it('should handle IS_PENDING', () => {
    const prevState = { ...initialState };

    const action = { type: types.IS_PENDING, payload: true };

    const nextState = reducer(prevState, action);
    expect(nextState).toEqual({
      ...prevState,
      loading: true
    });
  });

  it('should handle LOGIN_REQUEST', () => {
    const prevState = { ...initialState };

    const action = { type: types.LOGIN_REQUEST };

    const nextState = reducer(prevState, action);
    expect(nextState).toEqual({
      ...prevState,
      loggingIn: true
    });
  });

  it('should handle LOGIN_ERROR', () => {
    const prevState = { ...initialState, loggingIn: true };

    const action = { type: types.LOGIN_ERROR, payload: 'Some error' };

    const nextState = reducer(prevState, action);
    expect(nextState).toEqual({
      ...prevState,
      loggingIn: false,
      error: 'Some error'
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    const prevState = { ...initialState, loggingIn: true };

    const action = { type: types.LOGIN_SUCCESS, payload: 'User' };

    const nextState = reducer(prevState, action);
    expect(nextState).toEqual({
      ...prevState,
      model: 'User',
      loggingIn: false
    });
  });
});

describe('saga workers', () => {
  it('should handle sign in', () => {
    const user = { id: 1 };
    const action = actions.signIn('some@email.com', 'password');
    const generator = signInAsync(action);
    expect(generator.next().value).toEqual(put({ type: types.LOGIN_REQUEST }));
    expect(generator.next().value).toEqual(
      call(userService.login, 'some@email.com', 'password')
    );
    expect(generator.next(user).value).toEqual(
      call(userService.setAuthInStorage, user)
    );
    expect(generator.next(user).value).toEqual(
      put({ type: types.LOGIN_SUCCESS, payload: user })
    );
    expect(generator.next().value).toEqual(put(clientActions.fetch()));
    expect(generator.next().value).toEqual(put(push('/')));
    expect(generator.next().done).toBe(true);
  });

  it('should handle sign out', () => {
    const action = actions.signOut();
    const generator = signOutAsync(action);
    expect(generator.next().value).toEqual(call(userService.logout));
    expect(generator.next().value).toEqual(
      call(userService.setAuthInStorage, null)
    );
    expect(generator.next().value).toEqual(put({ type: types.UNSET_USER }));
    expect(generator.next().value).toEqual(put({ type: 'global/RESET' }));
    expect(generator.next().done).toBe(true);
  });

  it('should handle forgot password', () => {
    const action = actions.forgotPass('some@email.com');
    const generator = forgotPassAsync(action);
    expect(generator.next().value).toEqual(
      put({ type: types.PASSWORD_RESET_REQUEST })
    );
    expect(generator.next().value).toEqual(
      call(userService.forgotPass, { email: 'some@email.com' })
    );
    expect(generator.next().value).toEqual(
      put({ type: types.PASSWORD_RESET_SUCCESS })
    );
    expect(generator.next().value).toEqual(
      put(alertActions.success('Password recovery email sent'))
    );
    expect(generator.next().done).toBe(true);
  });

  it('should handle fetch', () => {
    const user = { id: 1 };
    const action = actions.fetch();
    const generator = fetchAsync(action);
    expect(generator.next().value).toEqual(
      put({ type: types.IS_PENDING, payload: true })
    );
    expect(generator.next().value).toEqual(call(userService.getMe));
    expect(generator.next(user).value).toEqual(
      call(userService.setAuthInStorage, user)
    );
    expect(generator.next(user).value).toEqual(
      put({ type: types.SET_USER, payload: user })
    );
    expect(generator.next().value).toEqual(put(clientActions.fetch()));
    expect(generator.next().value).toEqual(
      put({ type: types.IS_PENDING, payload: false })
    );
    expect(generator.next().done).toBe(true);
  });
});
