import { actions, reducer, initialState, types } from '_state/revenueStat';
import { fetchRevenueBreakdown } from '../revenueStat/saga';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { revenueStatsService } from '_services';
import { call, put } from 'redux-saga/effects';

const { FETCH, RESET, FETCH_ERROR, FETCH_SUCCESS } = types;

describe('actions', () => {
  it('should create an action to fetch revenueStats', () => {
    const payload = { seasonId: 1, eventId: 1 };
    const action = actions.fetch(payload);
    expect(action).toEqual({
      type: FETCH,
      payload
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
    const action = actions.fetch({ seasonId: 1 });
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
