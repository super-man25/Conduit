import { call, put, select } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { eventStatService } from '_services';
import { actions, reducer } from '_state/seasonStat';
import {
  FETCH_ASYNC,
  FETCH_ERROR,
  FETCH_SUCCESS,
  RESET,
  SET_FIRST_AND_LAST_DATE,
  SET_GROUPING_FILTER,
  SET_DATE_RANGE
} from '_state/seasonStat/actions';
import {
  fetchSeasonTimeStats,
  setDefaultDateRange
} from '_state/seasonStat/saga';
import { initialState } from '_state/seasonStat/reducer';
import {
  getSeasonStats,
  getSeasonStatFilterArguments,
  getSeasonStatDateLimits
} from '../seasonStat/selectors';
import { selectors } from '../season';

describe('actions', () => {
  it('should create an action to fetch seasonStats', () => {
    const action = actions.fetch();
    expect(action).toEqual({
      type: FETCH_ASYNC
    });
  });

  it('should create an action to clear seasonStats', () => {
    const action = actions.clear();
    expect(action).toEqual({
      type: RESET
    });
  });

  it('should create an action to set the group filter', () => {
    const action = actions.setGroupFilter(1);
    expect(action).toEqual({
      type: SET_GROUPING_FILTER,
      payload: 1
    });
  });

  it('should create an action to set the date range', () => {
    const from = new Date();
    const to = new Date();
    const action = actions.setDateRange({ from, to });
    expect(action).toEqual({
      type: SET_DATE_RANGE,
      payload: { to, from }
    });
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});

    expect(state).toEqual(initialState);
  });

  it('should handle FETCH_ASYNC actions', () => {
    const prevState = {
      ...initialState,
      loading: false
    };

    const action = { type: FETCH_ASYNC };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('should handle FETCH_SUCCESS', () => {
    const prevState = {
      ...initialState,
      loading: true,
      seasonStats: []
    };

    const seasonStats = [1, 2, 3];
    const action = { type: FETCH_SUCCESS, payload: seasonStats };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      loading: false,
      seasonStats
    });
  });

  it('should handle FETCH_ERROR', () => {
    const prevState = {
      ...initialState,
      loading: true,
      model: []
    };

    const action = { type: FETCH_ERROR };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      loading: false,
      model: []
    });
  });

  it('should handle RESET', () => {
    const prevState = {
      ...initialState,
      loading: true,
      eventStats: [1, 2, 3],
      selectedGroupFilter: 1,
      selectedDateFilter: 1,
      dateFilter: {
        from: new Date(),
        to: new Date()
      },
      eventDateLimits: {
        from: new Date(),
        to: new Date()
      }
    };

    const action = { type: RESET };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should handle SET_GROUPING_FILTER', () => {
    const prevState = {
      ...initialState,
      selectedGroupFilter: 0
    };

    const action = { type: SET_GROUPING_FILTER, payload: 1 };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      selectedGroupFilter: 1
    });
  });

  it('should handle SET_DATE_RANGE', () => {
    const prevState = {
      ...initialState,
      dateRange: { from: null, to: null }
    };

    const from = new Date();
    const to = new Date();
    const action = { type: SET_DATE_RANGE, payload: { from, to } };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      dateRange: { from, to }
    });
  });

  it('should handle SET_FIRST_AND_LAST_DATE', () => {
    const prevState = {
      ...initialState,
      dateLimits: { from: null, to: null }
    };

    const from = new Date();
    const to = new Date();
    const action = { type: SET_FIRST_AND_LAST_DATE, payload: { from, to } };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      dateLimits: { from, to },
      dateRange: { from, to }
    });
  });
});

describe('saga workers', () => {
  it('should handle setDefaultDateRange', () => {
    const generator = cloneableGenerator(setDefaultDateRange)();
    expect(generator.next().value).toEqual(
      select(selectors.selectActiveSeason)
    );

    const season = {
      startTimestamp: 1531934104198,
      endTimestamp: 1531934104198
    };

    expect(generator.next(season).value).toEqual(
      put(
        actions.setDateRange({
          from: new Date(season.startTimestamp),
          to: new Date(season.endTimestamp)
        })
      )
    );
  });

  it('should handle fetch', () => {
    const action = actions.fetch();
    const generator = cloneableGenerator(fetchSeasonTimeStats)(action);
    const dateRange = {
      from: new Date(),
      to: new Date()
    };
    const seasonId = 1;

    expect(generator.next().value).toEqual(
      select(getSeasonStatFilterArguments)
    );

    expect(generator.next(dateRange).value).toEqual(
      select(selectors.selectActiveSeasonId)
    );

    expect(generator.next(seasonId).value).toEqual(
      call(eventStatService.getAll, {
        seasonId,
        start: dateRange.from,
        end: dateRange.to
      })
    );

    // Fetch Success
    const successPath = generator.clone();

    const eventStats = [
      { date: new Date(), id: 1 },
      { date: new Date(), id: 2 }
    ];

    expect(successPath.next(eventStats).value).toEqual(
      put({ type: FETCH_SUCCESS, payload: eventStats })
    );
    expect(successPath.next().done).toBe(true);

    // Fetch Failure
    const failurePath = generator.clone();
    const error = new Error('EventStats service error');
    expect(failurePath.throw(error).value).toEqual(
      put({ type: FETCH_ERROR, payload: error })
    );
  });
});

describe('selectors', () => {
  it('getSeasonStats selector should return all seasonStats', () => {
    const state = {
      seasonStat: {
        ...initialState,
        seasonStats: [1, 2, 3]
      }
    };

    expect(getSeasonStats(state)).toEqual([1, 2, 3]);
  });

  it('getSeasonStatFilterArguments should return the current dateRange filter', () => {
    const state = {
      seasonStat: {
        ...initialState,
        dateRange: {
          from: 1,
          to: 1
        }
      }
    };

    expect(getSeasonStatFilterArguments(state)).toEqual({ from: 1, to: 1 });
  });

  it('getSeasonStatDateLimits should return the current seasonStat dateLimits', () => {
    const state = {
      seasonStat: {
        ...initialState,
        dateLimits: {
          from: 1,
          to: 1
        }
      }
    };

    expect(getSeasonStatDateLimits(state)).toEqual({ from: 1, to: 1 });
  });
});
