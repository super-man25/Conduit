import { actions, reducer } from '_state/revenueStat';
import {
  FETCH,
  FETCH_ERROR,
  FETCH_SUCCESS,
  RESET
} from '_state/revenueStat/actions';
import { initialState } from '_state/revenueStat/reducer';
import { fetchRevenueBreakdown } from '../revenueStat/saga';
import { cloneableGenerator } from 'redux-saga/utils';
import { revenueStatsService } from '_services';
import { call, put } from 'redux-saga/effects';

describe('actions', () => {
  it('should create an action to fetch revenueStats', () => {
    const action = actions.fetch();
    expect(action).toEqual({
      type: FETCH
    });
  });

  it('should create an action to reset revenueStats', () => {
    const action = actions.reset();
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

  it('should handle FETCH', () => {
    const prevState = {
      ...initialState
    };

    const action = { type: FETCH };
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

    const ticketBreakdown = [
      { id: 1, revenue: 100, ticketsSold: 100, name: 'Item 1' },
      { id: 2, revenue: 100, ticketsSold: 100, name: 'Item 2' },
      { id: 3, revenue: 100, ticketsSold: 100, name: 'Item 3' }
    ];

    const action = { type: FETCH_SUCCESS, payload: ticketBreakdown };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      ticketBreakdown
    });
  });

  it('should handle FETCH_ERROR', () => {
    const prevState = {
      ...initialState,
      loading: true
    };

    const action = { type: FETCH_ERROR, payload: 'Some Error' };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      error: 'Some Error'
    });
  });

  it('should handl RESET', () => {
    const prevState = {
      loading: true,
      error: 'An Error',
      ticketBreakdown: [{ id: 1, revenue: 100, ticketsSold: 100 }]
    };

    const action = { type: RESET };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({ ...initialState });
  });
});

describe('saga workers', () => {
  it('should handle fetch', () => {
    const action = actions.fetch();
    const generator = cloneableGenerator(fetchRevenueBreakdown)(action);

    expect(generator.next().value).toEqual(
      call(revenueStatsService.getAll, { seasonId: 1 })
    );

    // Fetch Success
    const successPath = generator.clone();

    const revenueStats = [
      { name: 'Group', id: 1, revenue: 1, ticketsSold: 1 },
      { name: 'Single', id: 2, revenue: 1, ticketsSold: 1 }
    ];

    expect(successPath.next(revenueStats).value).toEqual(
      put({ type: FETCH_SUCCESS, payload: revenueStats })
    );
    expect(successPath.next().done).toBe(true);

    // Fetch Failure
    const failurePath = generator.clone();
    const error = new Error('RevenueStats service error');
    expect(failurePath.throw(error).value).toEqual(
      put({ type: FETCH_ERROR, payload: error })
    );
  });
});
