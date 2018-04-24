import { call, put } from 'redux-saga/effects';
import { eventService } from '../_services';
import { cloneableGenerator } from 'redux-saga/utils';
import {
  actions,
  reducer
} from './events';

import {
  fetchAsync
} from './events/saga';

import {
  FETCH_ASYNC,
  FETCH_ERROR,
  FETCH_SUCCESS,
  RESET
} from './events/actions';

describe('actions', () => {
  it('should create an action to fetch events', () => {
    const action = actions.fetch();
    expect(action).toEqual({
      type: FETCH_ASYNC
    });
  });

  it('should create an action to clear records', () => {
    const action = actions.clear();
    expect(action).toEqual({
      type: RESET
    });
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual({
      loading: false,
      model: null
    });
  });

  it('should handle FETCH_ASYNC', () => {
    const prevState = {
      loading: false,
      model: null
    };

    const action = { type: FETCH_ASYNC };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      loading: true,
      model: null
    });
  });

  it('should handle FETCH_SUCCESS', () => {
    const prevState = {
      loading: true,
      model: null
    };

    const model = ['events'];
    const action = { type: FETCH_SUCCESS, payload: model };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      loading: false,
      model
    });
  });

  it('should handle FETCH_ERROR', () => {
    const prevState = {
      loading: true,
      model: null
    };

    const action = { type: FETCH_ERROR };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      loading: false,
      model: null
    });
  });

  it('should handle RESET', () => {
    const prevState = {
      loading: false,
      model: ['events']
    };

    const action = { type: RESET };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      loading: false,
      model: null
    });
  });
});

describe('saga workers', () => {
  it('should handle fetch', () => {
    const action = actions.fetch();
    const generator = cloneableGenerator(fetchAsync)(action);
    expect(generator.next().value).toEqual(call(eventService.getAll));

    const success = generator.clone();
    const events = ['events'];
    expect(success.next(events).value).toEqual(put({ type: FETCH_SUCCESS, payload: events }));
    expect(success.next().done).toBe(true);


    const fail = generator.clone();
    const error = new Error('some API error');
    expect(fail.throw(error).value).toEqual(put({ type: FETCH_ERROR, payload: error }));
  });
});
