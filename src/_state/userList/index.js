// @flow
import type { EDUser } from '_models';

// Action Types
export const FETCH_USERS_ASYNC = 'users/FETCH_USERS_ASYNC';
export const FETCH_USERS_ASYNC_SUCCESS = 'users/FETCH_USERS_ASYNC_SUCCESS';
export const FETCH_USERS_ASYNC_ERROR = 'users/FETCH_USERS_ASYNC_ERROR';
export const RESET_USERS = 'users/RESET_USERS';

// Constants
export type FetchUsersAction = { type: 'users/FETCH_USERS_ASYNC' };
export type FetchUsersSuccessAction = {
  type: 'users/FETCH_USERS_ASYNC_SUCCESS',
  payload: EDUser[],
};
export type FetchUsersErrorAction = {
  type: 'users/FETCH_USERS_ASYNC_ERROR',
  payload: Error,
};
export type ResetUsers = {
  type: 'users/RESET_USERS',
  payload: null,
};
export type Action =
  | FetchUsersAction
  | FetchUsersSuccessAction
  | FetchUsersErrorAction
  | ResetUsers;

// Actions
const fetchUserList = (): FetchUsersAction => ({ type: FETCH_USERS_ASYNC });
const resetUsers = (): ResetUsers => ({
  type: RESET_USERS,
  payload: null,
});
export const actions = { fetchUserList, resetUsers };

// Reducer/Initial State
export type State = {
  loading: boolean,
  userList: EDUser[],
};

export const initialState = {
  loading: false,
  userList: [],
};

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_USERS_ASYNC:
      return { ...state, loading: true };
    case FETCH_USERS_ASYNC_SUCCESS:
      return { ...state, userList: action.payload, loading: false };
    case FETCH_USERS_ASYNC_ERROR:
      return { ...state, loading: false };
    case RESET_USERS:
      return initialState;
    default:
      return state;
  }
};

// Selectors
type Store = {
  userList: State,
};
const selectUserList = (store: Store) => store.userList.userList;

export const selectors = {
  selectUserList,
};

export { default as saga } from './saga';
