import { client } from './client.reducer';
import { clientConstants } from '../_constants';

describe('client Reducer', () => {
  it(`action with type of ${ clientConstants.GET_REQUEST } should return an object with a loading attribute that is true`, () => {
    const expectedResult = { loading: true };

    expect(client({}, { type: clientConstants.GET_REQUEST })).toEqual(expectedResult);
  });
  it(`action with type of ${ clientConstants.GET_SUCCESS } should return an object with the client attribute passed with the action`, () => {
    const expectedResult = { id: 1, name: 'Mets', pricingInterval: 30 };

    expect(client({}, { type: clientConstants.GET_SUCCESS, client: { id: 1, name: 'Mets', pricingInterval: 30 } })).toEqual(expectedResult);
  });

  it(`action with type of ${ clientConstants.GET_FAILURE } should return an object with the error attribute passed with the action`, () => {
    const expectedResult = { error: { id: 111, message: 'Bad weather on the interwebs' } };

    expect(client({}, { type: clientConstants.GET_FAILURE, error: { id: 111, message: 'Bad weather on the interwebs' } })).toEqual(expectedResult);
  });

  it(`action with type of ${ clientConstants.UPDATE_REQUEST } should return an object where the client attribute has an updating : true property`, () => {
    const originalState = { id: 1, name: 'Mets', pricingInterval: 30 };
    const futureClient = { id: 1, name: 'MetZ', pricingInterval: 30 };
    const expectedResult = { id: 1, name: 'Mets', pricingInterval: 30, updating: true };

    expect(client(originalState, { type: clientConstants.UPDATE_REQUEST, client: { id: 2, name: 'Mets', pricingInterval: 30 } })).toEqual(expectedResult);
    expect(client(originalState, { type: clientConstants.UPDATE_REQUEST, client: futureClient }).updating).toEqual(true);
  });

  it(`action with type of ${ clientConstants.UPDATE_SUCCESS } should return an object with the client attribute passed with the action`, () => {
    const originalState = { id: 1, name: 'Mets', pricingInterval: 30 };

    expect(client(originalState, { type: clientConstants.UPDATE_SUCCESS, client: { id: 1, name: 'Jets', pricingInterval: 30 } }).name).toEqual('Jets');
  });

  it(`action with type of ${ clientConstants.UPDATE_FAILURE } should return an object with the client attribute that has an updateError attribute and no updating:true attribute`, () => {
    const originalState = { id: 1, name: 'Mets', pricingInterval: 30, updating: true };
    const refError = { id: 111, message: 'Bad weather on the interwebs' };

    expect(client(originalState, { type: clientConstants.UPDATE_FAILURE, error: refError }).client.updateError).toEqual(refError);
    expect(client(originalState, { type: clientConstants.UPDATE_FAILURE, error: refError }).client.updating).toBeUndefined();
  });

});
