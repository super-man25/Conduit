import { alert } from './alert.reducer';
import { alertConstants } from '../_constants';

describe('alert Reducer', () => {
  it('action with type of ' + alertConstants.SUCCESS + ' should return an object of a type alert-success with the appropriate message', () => {
    const testMessage = 'successful login!';
    const expectedResult = { type: 'alert-success', message: testMessage }
  
    expect( alert({}, {type: 'ALERT_SUCCESS', message: testMessage}) ).toEqual(expectedResult)
  })
  it('action with type of ' + alertConstants.ERROR + ' should return an object of a type alert-danger with the appropriate message', () => {
    const testMessage = 'bad credentials';
    const expectedResult = { type: 'alert-danger', message: testMessage }
  
    expect( alert({}, {type: 'ALERT_ERROR', message: testMessage}) ).toEqual(expectedResult)
  })
  it('action with type of ' + alertConstants.CLEAR + ' should return an empty object', () => {
    const expectedResult = {}
  
    expect( alert({}, {type: 'ALERT_CLEAR'}) ).toEqual(expectedResult)
  })
  it('action with an uknown type of OOPS! should return an object consisting of the state before the action', () => {
    const initialState = { count: 6 };
  
    expect( alert(initialState, {type: 'OOPS!'}) ).toEqual(initialState)
  })  
  it('action with an undefined type should return an object consisting of the state before the action', () => {
    const initialState = { count: 6 };
  
    expect( alert(initialState, {message: 'OOPS!'}) ).toEqual(initialState)
  })
})