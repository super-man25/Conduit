import { registration } from './registration.reducer';
import { userConstants } from '../_constants';

describe('registration Reducer', () => {
  it(`action with type of ${ userConstants.REGISTER_REQUEST } should return an object with registering property of true`, () => {
    const expectedResult = { registering: true };

    expect(registration({}, { type: userConstants.REGISTER_REQUEST })).toEqual(expectedResult);
  });
  it(`action with type of ${ userConstants.REGISTER_SUCCESS } should return an empty object`, () => {
    const expectedResult = {};

    expect(registration({}, { type: userConstants.REGISTER_SUCCESS })).toEqual(expectedResult);
  });
  it(`action with type of ${ userConstants.REGISTER_FAILURE } should return an empty object`, () => {
    const expectedResult = {};

    expect(registration({}, { type: userConstants.REGISTER_FAILURE })).toEqual(expectedResult);
  });
  it('action with an uknown type of OOPS! should return an object consisting of the state before the action', () => {
    const initialState = { count: 6 };

    expect(registration(initialState, { type: 'OOPS!' })).toEqual(initialState);
  });
  it('action with an undefined type should return an object consisting of the state before the action', () => {
    const initialState = { count: 6 };

    expect(registration(initialState, { message: 'OOPS!' })).toEqual(initialState);
  });
});
