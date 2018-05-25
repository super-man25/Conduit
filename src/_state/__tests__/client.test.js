import { clientService, integrationService } from '_services';
import { actions, reducer } from '_state/client';
import {
  FETCH_ERROR,
  FETCH_ASYNC,
  FETCH_SUCCESS,
  UPDATE_ASYNC,
  UPDATE_SUCCESS,
  UPDATE_ERROR,
  UPDATE_INTEGRATION
} from '_state/client/actions';
import {
  getClientAsync,
  updateClientAsync,
  toggleIntegrationAsync
} from '_state/client/saga';
import { call, put, select } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { initialState } from '_state/client/reducer';
import { getClientId, getClient } from '_state/client/selectors';

describe('actions', () => {
  it('should create an action to get a client', () => {
    const action = actions.fetch();
    expect(action).toEqual({
      type: FETCH_ASYNC
    });
  });

  it('should create an action to update a client', () => {
    const action = actions.update();
    expect(action).toEqual({
      type: UPDATE_ASYNC
    });
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should handle FETCH_ASYNC', () => {
    const prevState = initialState;

    const action = { type: FETCH_ASYNC, payload: true };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('should handle FETCH_SUCCESS', () => {
    const prevState = {
      ...initialState,
      loading: true
    };

    const payload = { id: 1, name: 'Mets', pricingInterval: 15 };
    const action = { type: FETCH_SUCCESS, payload };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      id: payload.id,
      name: payload.name,
      pricingInterval: payload.pricingInterval,
      dirtyPricingInterval: payload.pricingInterval
    });
  });

  it('should handle UPDATE_ASYNC', () => {
    const prevState = {
      ...initialState,
      loading: false,
      id: 1,
      name: 'Mets',
      pricingInterval: 30
    };
    const payload = { id: 1, name: 'Mets', pricingInterval: 1440 };
    const action = { type: UPDATE_ASYNC, payload };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: true
    });
  });

  it('should handle UPDATE_SUCCESS', () => {
    const prevState = {
      loading: true,
      id: 1,
      name: 'Mets',
      pricingInterval: 30
    };
    const payload = { id: 1, name: 'Mets', pricingInterval: 1440 };
    const action = { type: UPDATE_SUCCESS, payload };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      pricingInterval: 1440,
      dirtyPricingInterval: 1440
    });
  });
});

describe('saga workers', () => {
  it('should handle fetchClient', () => {
    const action = actions.fetch();
    const clientId = 1;
    const generator = cloneableGenerator(getClientAsync)(action);
    expect(generator.next().value).toEqual(select(getClientId));
    expect(generator.next(clientId).value).toEqual(
      call(clientService.getClient, clientId)
    );

    const success = generator.clone();
    const client = { id: 1, name: 'Mets' };
    expect(success.next(client).value).toEqual(
      put({ type: FETCH_SUCCESS, payload: client })
    );
    expect(success.next().done).toBe(true);

    const fail = generator.clone();
    const error = new Error('some API error');
    expect(fail.throw(error).value).toEqual(
      put({ type: FETCH_ERROR, payload: error })
    );
  });

  it('should handle update', () => {
    const diff = { pricingInterval: 60 };
    const action = actions.update(diff);
    const client = { id: 1, name: 'Mets', pricingInterval: 15 };
    const updatedClient = { ...client, ...diff };

    const generator = cloneableGenerator(updateClientAsync)(action);
    expect(generator.next().value).toEqual(select(getClient));
    expect(generator.next(client).value).toEqual(
      call(clientService.updateClient, updatedClient)
    );

    const success = generator.clone();
    expect(success.next(updatedClient).value).toEqual(
      put({
        type: UPDATE_SUCCESS,
        payload: updatedClient
      })
    );

    const error = new Error('some API error');
    const fail = generator.clone();
    expect(fail.throw(error).value).toEqual(
      put({ type: UPDATE_ERROR, payload: error })
    );
  });

  it('should handle toggle', () => {
    const id = 1;
    const isActive = true;
    const action = actions.toggleIntegration({ id, isActive });
    const generator = cloneableGenerator(toggleIntegrationAsync)(action);
    expect(generator.next({ id, isActive }).value).toEqual(
      call(integrationService.toggleIntegration, id, { isActive })
    );
    expect(generator.next({ isActive }).value).toEqual(
      put({ type: UPDATE_INTEGRATION, payload: { id, isActive } })
    );
  });
});
