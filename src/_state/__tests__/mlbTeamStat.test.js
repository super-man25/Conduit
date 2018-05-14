import { mlbTeamStatService } from '_services';
import { delay } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { actions, reducer } from '_state/mlbTeamStat';
import {
  FETCH_ASYNC,
  FETCH_ERROR,
  FETCH_SUCCESS,
  RESET
} from '_state/mlbTeamStat/actions';
import { fetchMLBTeamStatAsync } from '_state/mlbTeamStat/saga';
import { initialState } from '_state/mlbTeamStat/reducer';

describe('actions', () => {
  it('should create an action to fetch mlbTeamStats', () => {
    const action = actions.fetch();
    expect(action).toEqual({
      type: FETCH_ASYNC
    });
  });

  it('should create an action to clear mlbTeamStats', () => {
    const action = actions.clear();
    expect(action).toEqual({
      type: RESET
    });
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should handle FETCH_ASYNC', () => {
    const prevState = {
      ...initialState,
      loading: false
    };

    const action = { type: FETCH_ASYNC };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: true
    });
  });

  it('should handle FETCH_SUCCESS', () => {
    const prevState = {
      ...initialState,
      loading: true
    };

    const mlbTeamStat = {
      id: 1,
      createdAt: undefined,
      modifiedAt: undefined,
      clientId: 1,
      wins: 10,
      losses: 10,
      gamesRemaining: 50
    };

    const action = { type: FETCH_SUCCESS, payload: mlbTeamStat };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      overview: mlbTeamStat
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
      ...prevState,
      loading: false
    });
  });
});

describe('saga workers', () => {
  it('should handle fetch', () => {
    const mlbTeamStat = {
      id: 1,
      createdAt: undefined,
      modifiedAt: undefined,
      clientId: 1,
      wins: 10,
      losses: 10,
      gamesRemaining: 50
    };

    const action = actions.fetch();
    const generator = cloneableGenerator(fetchMLBTeamStatAsync)(action);
    expect(generator.next().value).toEqual(call(mlbTeamStatService.getStats));
    expect(generator.next(mlbTeamStat).value).toEqual(
      put({ type: FETCH_SUCCESS, payload: mlbTeamStat })
    );
    expect(generator.next().done).toBe(true);
  });
});
