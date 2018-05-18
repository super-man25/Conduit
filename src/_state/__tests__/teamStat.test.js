import { teamStatService } from '_services';
import { delay } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { actions, reducer } from '_state/teamStat';
import {
  FETCH_ASYNC,
  FETCH_ERROR,
  FETCH_SUCCESS,
  RESET
} from '_state/teamStat/actions';
import { fetchTeamStatAsync } from '_state/teamStat/saga';
import { initialState } from '_state/teamStat/reducer';

describe('actions', () => {
  it('should create an action to fetch teamStats', () => {
    const action = actions.fetch();
    expect(action).toEqual({
      type: FETCH_ASYNC
    });
  });

  it('should create an action to clear teamStats', () => {
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

    const teamStat = {
      id: 1,
      createdAt: undefined,
      modifiedAt: undefined,
      clientId: 1,
      wins: 10,
      losses: 10,
      gamesTotal: 50
    };

    const action = { type: FETCH_SUCCESS, payload: teamStat };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      overview: teamStat
    });
  });

  it('should handle FETCH_ERROR', () => {
    const prevState = {
      loading: true,
      overview: null
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
    const teamStat = {
      id: 1,
      createdAt: undefined,
      modifiedAt: undefined,
      clientId: 1,
      wins: 10,
      losses: 10,
      gamesTotal: 50
    };

    const action = actions.fetch();
    const generator = cloneableGenerator(fetchTeamStatAsync)(action);
    expect(generator.next().value).toEqual(call(teamStatService.getStats));
    expect(generator.next(teamStat).value).toEqual(
      put({ type: FETCH_SUCCESS, payload: teamStat })
    );
    expect(generator.next().done).toBe(true);
  });
});
