import { users } from './users.reducer';
import { userConstants } from '../_constants';

describe('users Reducer', () => {
  it(`action with type of ${ userConstants.GETALL_REQUEST } should return an object with a loading attribute that is true`, () => {
    const expectedResult = { loading: true };

    expect(users({}, { type: userConstants.GETALL_REQUEST })).toEqual(expectedResult);
  });
  // it(`action with type of ${ alertConstants.ERROR } should return an object of a type alert-danger with the appropriate message`, () => {
  //   const testMessage = 'bad credentials';
  //   const expectedResult = { type: 'alert-danger', message: testMessage };

  //   expect(alert({}, { type: 'ALERT_ERROR', message: testMessage })).toEqual(expectedResult);
  // });
  // it(`action with type of ${ alertConstants.CLEAR } should return an empty object`, () => {
  //   const expectedResult = {};

  //   expect(alert({}, { type: 'ALERT_CLEAR' })).toEqual(expectedResult);
  // });
  // it('action with an uknown type of OOPS! should return an object consisting of the state before the action', () => {
  //   const initialState = { count: 6 };

  //   expect(alert(initialState, { type: 'OOPS!' })).toEqual(initialState);
  // });
  // it('action with an undefined type should return an object consisting of the state before the action', () => {
  //   const initialState = { count: 6 };

  //   expect(alert(initialState, { message: 'OOPS!' })).toEqual(initialState);
  // });
});
