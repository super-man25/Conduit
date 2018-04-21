// import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { clientActions } from './client.actions'; // getClient  updateClient
import { clientConstants, alertConstants } from '../_constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status,
    statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};

describe('clientActions', () => {
  it(`getClient method should dispatch an action of type ${ clientConstants.GET_REQUEST }`, () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(
        200, // status
        null, // statusText
        '{ "id": "2", "name": "Mocked Client", "pricingInterval": "33" }' // response.body
      )));

    const store = mockStore({});
    const expectedActions = [
      { type: clientConstants.GET_REQUEST },
      { type: clientConstants.GET_SUCCESS, client: { id: '2', name: 'Mocked Client', pricingInterval: '33' } }
    ];

    return store.dispatch(clientActions.getClient())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('failure to get the client should dispatch 3 actions, and not change the database ', () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(
        404, // status
        'Not Found', // statusText
        '{ "code": 404, "message": "Client could not be found" }' // response.body
      )));

    const store = mockStore({});
    const expectedActions = [
      { type: clientConstants.GET_REQUEST },
      { type: clientConstants.GET_FAILURE, error: 'Not Found' },
      { type: alertConstants.ERROR, message: 'Not Found' }
    ];

    return store.dispatch(clientActions.getClient())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('successful updateClient changing the name should dispatch 3 actions, and update the database ', () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(
        200, // status
        'Client successfully updated', // statusText
        '{ "id": 2, "name": "Updated Client", "pricingInterval": 33 }' // response.body
      )));

    const store = mockStore({ client: { id: 2, name: 'Original Client', pricingInterval: 33 } });
    const expectedActions = [
      { type: clientConstants.UPDATE_REQUEST, client: { id: 2, name: 'Updated Client', pricingInterval: 33 } },
      { type: clientConstants.UPDATE_SUCCESS, client: { id: 2, name: 'Updated Client', pricingInterval: 33 } },
      { type: alertConstants.SUCCESS, message: 'Client successfully updated' }
    ];

    return store.dispatch(clientActions.updateClient('name', 'Updated Client'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('successful updateClient changing the pricingInterval should dispatch 3 actions, and update the database ', () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(
        200, // status
        'Client successfully updated', // statusText
        '{ "id": 2, "name": "Original Client", "pricingInterval": 66 }' // response.body
      )));

    const store = mockStore({ client: { id: 2, name: 'Original Client', pricingInterval: 33 } });
    const expectedActions = [
      { type: clientConstants.UPDATE_REQUEST, client: { id: 2, name: 'Original Client', pricingInterval: 66 } },
      { type: clientConstants.UPDATE_SUCCESS, client: { id: 2, name: 'Original Client', pricingInterval: 66 } },
      { type: alertConstants.SUCCESS, message: 'Client successfully updated' }
    ];

    return store.dispatch(clientActions.updateClient('pricingInterval', 66))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('failure to update the client should dispatch 3 actions, and update the database ', () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(
        400, // status
        'Bad Request', // statusText
        '{ "code": 400, "message": "Client could not be updated" }' // response.body
      )));

    const store = mockStore({ client: { id: 2, name: 'Original Client', pricingInterval: 33 } });
    const expectedActions = [
      { type: clientConstants.UPDATE_REQUEST, client: { id: 2, name: 'Original Client', pricingInterval: 77 } },
      { type: clientConstants.UPDATE_FAILURE, error: 'Bad Request' },
      { type: alertConstants.ERROR, message: 'Bad Request' }
    ];

    return store.dispatch(clientActions.updateClient('pricingInterval', 77))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

});
