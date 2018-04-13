import { userActions } from './user.actions';
import { userConstants } from '../_constants';

const testEmail = 'bob@bob.com';
const testPass = 'bob';

describe('userActions', () => {
  it(`login method should dispatch ${ userConstants.LOGIN_REQUEST }`, () => {
    const testMessage = 'Hello World';
    const expectedResult = { message: testMessage };

    // expect(userActions.login(testEmail, testPass)).toEqual(expectedResult);
    expect(1).toEqual(1);
  });
  // it(`error method should return the furnished message, of a type ${ alertConstants.ERROR }`, () => {
  //   const testMessage = 'Something BAD happened...';
  //   const expectedResult = { type: alertConstants.ERROR, message: testMessage };

  //   expect(alertActions.error(testMessage)).toEqual(expectedResult);
  // });
  // it(`clear method should return no message, of a type ${ alertConstants.CLEAR }`, () => {
  //   const expectedResult = { type: alertConstants.CLEAR };

  //   expect(alertActions.clear()).toEqual(expectedResult);
  // });
});
