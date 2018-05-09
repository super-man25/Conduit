import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { eventStatService } from '_services';
import { actions, reducer } from '_state/eventStats';

import {
  FETCH_ASYNC,
  FETCH_ERROR,
  FETCH_SUCCESS,
  RESET
} from '_state/eventStats/actions';

import { fetchEventStatsAsync } from '_state/eventStats/saga';

describe('actions', () => {
  it('should create an action to fetch eventStats', () => {
    const action = actions.fetch();
    expect(action).toEqual({
      type: FETCH_ASYNC
    });
  });

  it('should create an action to clear eventStats', () => {
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
      model: []
    });
  });

  it('should handle FETCH_ASYNC actions', () => {
    const prevState = {
      loading: false,
      model: []
    };

    const action = { type: FETCH_ASYNC };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      loading: true,
      model: []
    });
  });

  it('should handle FETCH_SUCCESS', () => {
    const prevState = {
      loading: true,
      model: []
    };

    const model = [1, 2, 3];
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
      model: []
    };

    const action = { type: FETCH_ERROR };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      loading: false,
      model: []
    });
  });

  it('should handle RESET', () => {
    const prevState = {
      loading: true,
      model: [1, 2, 3]
    };

    const action = { type: RESET };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      loading: false,
      model: []
    });
  });
});

describe('saga workers', () => {
  it('should handle fetch', () => {
    const action = actions.fetch();
    const generator = cloneableGenerator(fetchEventStatsAsync)(action);
    expect(generator.next().value).toEqual(call(eventStatService.getAll));

    const successPath = generator.clone();
    const eventStats = [1, 2, 3];
    expect(successPath.next(eventStats).value).toEqual(
      put({ type: FETCH_SUCCESS, payload: eventStats })
    );
    expect(successPath.next().done).toBe(true);

    const failurePath = generator.clone();
    const error = new Error('EventStats service error');
    expect(failurePath.throw(error).value).toEqual(
      put({ type: FETCH_ERROR, payload: error })
    );
  });
});
