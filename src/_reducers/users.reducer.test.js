import { users } from './users.reducer';
import { userConstants } from '../_constants';

describe('users Reducer', () => {
  it(`action with type of ${ userConstants.GETALL_REQUEST } should return an object with a loading attribute that is true`, () => {
    const expectedResult = { loading: true };

    expect(users({}, { type: userConstants.GETALL_REQUEST })).toEqual(expectedResult);
  });
  it(`action with type of ${ userConstants.GETALL_SUCCESS } should return an object with an items attribute equal to the users attribute of the action`, () => {
    const usersList = [1,2,5];
    const expectedResult = { items: [1,2,5] };

    expect(users({}, { type: userConstants.GETALL_SUCCESS, users: usersList })).toEqual(expectedResult);
  });
  it(`action with type of ${ userConstants.GETALL_FAILURE } should return an object with an error attribute equal to the error attribute of the action`, () => {
    const usersError = 'No users were found';
    const expectedResult = { error: usersError };

    expect(users({}, { type: userConstants.GETALL_FAILURE, error: usersError })).toEqual(expectedResult);
  });
  it(`action with type of ${ userConstants.DELETE_REQUEST } should return an object where the user being deleted has a deleting attribute of true`, () => {
    const initialState = { items: [{id:2, name:'betsy'}, {id:5, name:'jim'}, {id:7, name:'jane'}] };
    const expectedResult = { items: [{id:2, name:'betsy'}, {id:5, name:'jim', deleting:true}, {id:7, name:'jane'}] };

    expect(users(initialState, { type: userConstants.DELETE_REQUEST, id: 5 })).toEqual(expectedResult);
  });
  it(`action with type of ${ userConstants.DELETE_SUCCESS } should return an object where the user being deleted no longer exists`, () => {
    const initialState = { items: [{id:2, name:'betsy'}, {id:5, name:'jim', deleting:true}, {id:7, name:'jane'}] };
    const expectedResult = { items: [{id:2, name:'betsy'}, {id:7, name:'jane'}] };

    expect(users(initialState, { type: userConstants.DELETE_SUCCESS, id: 5 })).toEqual(expectedResult);
  });
  it(`action with type of ${ userConstants.DELETE_FAILURE } should return an object where the user being deleted has a deleteError attribute`, () => {
    const userError = 'Could not be deleted';
    const initialState = { items: [{id:2, name:'betsy'}, {id:5, name:'jim', deleting:true}, {id:7, name:'jane'}] };
    const expectedResult = { items: [{id:2, name:'betsy'}, {id:5, name:'jim', deleteError:userError}, {id:7, name:'jane'}] };

    expect(users(initialState, { type: userConstants.DELETE_FAILURE, id: 5, error: userError})).toEqual(expectedResult);
  });
  it('action with an uknown type of OOPS! should return an object consisting of the state before the action', () => {
    const initialState = { count: 6 };

    expect(users(initialState, { type: 'OOPS!' })).toEqual(initialState);
  });
  it('action with an undefined type should return an object consisting of the state before the action', () => {
    const initialState = { count: 6 };

    expect(users(initialState, { message: 'OOPS!' })).toEqual(initialState);
  });
});
