import { alertActions } from './alert.actions';
import { alertConstants } from '../_constants';

describe('alertActions', () => {
  it(`success method should return the furnished message, of a type ${ alertConstants.SUCCESS}`, () => {
    const testMessage = 'Hello World';
    const expectedResult = { type: alertConstants.SUCCESS, message: testMessage
    };
    expect(alertActions.success(testMessage)).toEqual(expectedResult);
  });
  it(`error method should return the furnished message, of a type ${ alertConstants.ERROR}`, () => {
    const testMessage = 'Something BAD happened...';
    const expectedResult = { type: alertConstants.ERROR, message: testMessage
    };
    expect(alertActions.error(testMessage)).toEqual(expectedResult);
  });
  it(`clear method should return no message, of a type ${ alertConstants.CLEAR}`, () => {
    const expectedResult = { type: alertConstants.CLEAR
    };
    expect(alertActions.clear()).toEqual(expectedResult);
  });
});
