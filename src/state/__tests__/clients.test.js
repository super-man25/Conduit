import { call, put } from 'redux-saga/effects';
import { clientService } from '_services';
import { cloneableGenerator } from 'redux-saga/utils';
import { actions, reducer } from 'state/clients';

import { getClientAsync } from 'state/clients/saga';

import {
  GET_REQUEST,
  GET_SUCCESS,
  GET_FAILURE,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAILURE
} from 'state/clients/actions';
import { ERROR } from '../alert/actions';

describe('actions', () => {
  it('should create an action to get a client', () => {
    const action = actions.getClient();
    expect(action).toEqual({
      type: GET_REQUEST
    });
  });

  it('should create an action to update a client', () => {
    const action = actions.updateClient();
    expect(action).toEqual({
      type: UPDATE_REQUEST
    });
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual({
      loading: false
    });
  });

  it('should handle GET_REQUEST', () => {
    const prevState = {
      loading: false,
      id: null,
      name: null,
      pricingInterval: null
    };

    const action = { type: GET_REQUEST };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      loading: true,
      id: null,
      name: null,
      pricingInterval: null
    });
  });

  it('should handle GET_SUCCESS', () => {
    const prevState = {
      loading: true,
      id: null,
      name: null,
      pricingInterval: null
    };
    const payload = { id: 1, name: 'Mets', pricingInterval: 15 };
    const action = { type: GET_SUCCESS, payload };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      loading: false,
      id: payload.id,
      name: payload.name,
      pricingInterval: payload.pricingInterval
    });
  });

  it('should handle UPDATE_REQUEST', () => {
    const prevState = {
      updating: false,
      id: 1,
      name: 'Mets',
      pricingInterval: 30
    };
    const payload = { id: 1, name: 'Mets', pricingInterval: 1440 };
    const action = { type: UPDATE_REQUEST, payload };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      updating: true,
      id: 1,
      name: 'Mets',
      pricingInterval: 30
    });
  });

  it('should handle UPDATE_SUCCESS', () => {
    const prevState = {
      updating: true,
      id: 1,
      name: 'Mets',
      pricingInterval: 30
    };
    const payload = { id: 1, name: 'Mets', pricingInterval: 1440 };
    const action = { type: UPDATE_SUCCESS, payload };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      updating: false,
      id: 1,
      name: 'Mets',
      pricingInterval: 1440
    });
  });
});

describe('saga workers', () => {
  it('should handle getClient', () => {
    const action = actions.getClient();
    const generator = cloneableGenerator(getClientAsync)(action);
    expect(generator.next().value).toEqual(call(clientService.getClient));

    const success = generator.clone();
    const client = 'client';
    expect(success.next(client).value).toEqual(
      put({ type: GET_SUCCESS, payload: client })
    );
    expect(success.next().done).toBe(true);

    const fail = generator.clone();
    const error = new Error('some API error');
    expect(fail.throw(error).value).toEqual(
      put({ type: ERROR, payload: error })
    );
    expect(fail.next().value).toEqual(
      put({ type: GET_FAILURE, payload: error })
    );
  });

  xit('should handle updateClient', () => {
    // const action = actions.updateClient('pricingInterval', 60);
    // const generator = cloneableGenerator(updateClientAsync)(action);
    // expect(generator.next().value).toEqual(
    //   call(
    //     clientService.updateClient({ id: 1, name: 'Mets', pricingInterval: 60 })
    //   )
    // );
    // const success = generator.clone();
    // const client = 'client';
    // expect(success.next(client).value).toEqual(
    //   put({ type: UPDATE_SUCCESS, payload: client })
    // );
    // expect(success.next().done).toBe(true);
    // const fail = generator.clone();
    // const error = new Error('some API error');
    // expect(fail.throw(error).value).toEqual(
    //   put({ type: ERROR, payload: error })
    // );
    // expect(fail.next().value).toEqual(
    //   put({ type: UPDATE_FAILURE, payload: error })
    // );
  });
});
