import { authentication } from './authentication.reducer';
import { userConstants } from '../_constants';

const testUser = { firstName: 'bob', lastName: 'bob', email: 'bob@bob.com' };

describe('authentication Reducer', () => {
  it(`action with type of ${ userConstants.LOGIN_REQUEST } should return the appropriate object`, () => {
    const expectedResult = { loggingIn: true, user: testUser };

    expect(authentication({}, { type: userConstants.LOGIN_REQUEST, user: testUser })).toEqual(expectedResult);
  });
  it(`action with type of ${ userConstants.LOGIN_SUCCESS } should return the appropriate object`, () => {
    const expectedResult = { loggedIn: true, user: testUser };

    expect(authentication({}, { type: userConstants.LOGIN_SUCCESS, user: testUser })).toEqual(expectedResult);
  });
  it(`action with type of ${ userConstants.LOGIN_FAILURE } should return an empty object`, () => {
    const expectedResult = {};

    expect(authentication({}, { type: userConstants.LOGIN_FAILURE })).toEqual(expectedResult);
  });
  it(`action with type of ${ userConstants.LOGOUT } should return an empty object`, () => {
    const expectedResult = {};

    expect(authentication({}, { type: userConstants.LOGOUT })).toEqual(expectedResult);
  });
  it('action with an unrecognized type should return an object consisting of the state before the action', () => {
    const initialState = { count: 6 };

    expect(authentication(initialState, { type: 'OOPS!' })).toEqual(initialState);
  });
});
