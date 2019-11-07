import { call, put, select } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { eventStatService, transactionReportService } from '_services';
import { actions, reducer } from '_state/eventStat';
import {
  FETCH_ASYNC,
  FETCH_ERROR,
  FETCH_SUCCESS,
  RESET,
  SET_FIRST_AND_LAST_DATE,
  SET_GROUPING_FILTER,
  SET_DATE_RANGE,
  DOWNLOAD_EVENT_REPORT,
  DOWNLOAD_EVENT_REPORT_SUCCESS,
  DOWNLOAD_EVENT_REPORT_ERROR
} from '_state/eventStat/actions';
import {
  setDefaultDateRange,
  fetchEventTimeStats,
  downloadEventReport
} from '_state/eventStat/saga';
import { initialState, serialize } from '_state/eventStat/reducer';
import {
  getEventStatFilterArguments,
  getEventStats,
  getEventStatState,
  getEventStatDateLimits
} from '../eventStat/selectors';
import { selectors } from '../event';
import { selectors as seasonSelectors } from '../season';
import alertActions from '_state/alert/actions';
import { saveAs } from 'file-saver';

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

  it('should create an action to download event report', () => {
    const payload = {
      id: 1,
      start: '2018-10-01T00:00:00.00Z',
      end: '2019-01-01T00:00:00.00Z'
    };
    const action = actions.downloadEventReport(payload);
    expect(action).toEqual({
      type: DOWNLOAD_EVENT_REPORT,
      payload
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
      eventStats: [],
      eventStatsMeta: null
    };

    const eventStats = [
      {
        inventory: 2219,
        isProjected: true,
        periodicInventory: -201,
        periodicRevenue: 6704.91,
        revenue: 26184.1,
        timestamp: '2019-09-25T04:00:00Z'
      },
      {
        inventory: 2568,
        isProjected: false,
        periodicInventory: -2,
        periodicRevenue: 170.5,
        revenue: 13142.28,
        timestamp: '2019-09-18T04:00:00Z'
      }
    ];
    const eventStatsMeta = {
      interval: 'So meta',
      timeZone: 'America/New_York'
    };
    const eventStatsResponse = {
      data: eventStats,
      meta: eventStatsMeta
    };
    const action = { type: FETCH_SUCCESS, payload: eventStatsResponse };
    const nextState = reducer(prevState, action);
    const serializedEventStats = serialize(eventStats, initialState);

    expect(nextState).toEqual({
      ...initialState,
      loading: false,
      eventStats: serializedEventStats,
      eventStatsMeta
    });

    // Assert on projection keys
    const projectedStat = serializedEventStats.find((e) => e.isProjected);
    expect(projectedStat).toHaveProperty('projectedPeriodicRevenue');
    expect(projectedStat).toHaveProperty('projectedPeriodicInventory');
    expect(projectedStat).toHaveProperty('projectedRevenue');
    expect(projectedStat).toHaveProperty('projectedInventory');
  });

  it('should handle negative projections with FETCH_SUCCESS', () => {
    const prevState = {
      ...initialState,
      loading: true,
      eventStats: [],
      eventStatsMeta: null
    };

    const eventStats = [
      {
        inventory: -10,
        isProjected: true,
        periodicInventory: -210,
        periodicRevenue: 6704.91,
        revenue: 26184.1,
        timestamp: '2019-09-25T04:00:00Z'
      },
      {
        inventory: 2568,
        isProjected: false,
        periodicInventory: -2,
        periodicRevenue: 170.5,
        revenue: 13142.28,
        timestamp: '2019-09-18T04:00:00Z'
      }
    ];
    const eventStatsMeta = {
      interval: 'So meta',
      timeZone: 'America/New_York'
    };
    const eventStatsResponse = {
      data: eventStats,
      meta: eventStatsMeta
    };
    const action = { type: FETCH_SUCCESS, payload: eventStatsResponse };
    const nextState = reducer(prevState, action);
    const serializedEventStats = serialize(eventStats, initialState);

    expect(nextState).toEqual({
      ...initialState,
      loading: false,
      eventStats: serializedEventStats,
      eventStatsMeta
    });

    // Assert on projection keys
    const projectedStat = serializedEventStats.find((e) => e.isProjected);
    const negativeProjection = eventStats.find((e) => e.isProjected);

    expect(projectedStat).toHaveProperty('projectedPeriodicRevenue');
    expect(projectedStat).toHaveProperty('projectedPeriodicInventory');
    expect(projectedStat).toHaveProperty('projectedRevenue');
    expect(projectedStat).toHaveProperty('projectedInventory');
    expect(projectedStat.projectedInventory).toBe(0);
    expect(projectedStat.projectedPeriodicInventory).toBe(
      negativeProjection.periodicInventory - negativeProjection.inventory
    );
  });

  it('should handle conflicting zero/nonzero projections with FETCH_SUCCESS', () => {
    const prevState = {
      ...initialState,
      loading: true,
      eventStats: [],
      eventStatsMeta: null
    };

    const eventStats = [
      {
        inventory: 100,
        isProjected: true,
        periodicInventory: 0,
        periodicRevenue: 6704.91,
        revenue: 26184.1,
        timestamp: '2019-09-25T04:00:00Z'
      },
      {
        inventory: 2568,
        isProjected: true,
        periodicInventory: -2,
        periodicRevenue: 0,
        revenue: 13142.28,
        timestamp: '2019-09-18T04:00:00Z'
      }
    ];
    const eventStatsMeta = {
      interval: 'So meta',
      timeZone: 'America/New_York'
    };
    const eventStatsResponse = {
      data: eventStats,
      meta: eventStatsMeta
    };
    const action = { type: FETCH_SUCCESS, payload: eventStatsResponse };
    const nextState = reducer(prevState, action);
    const serializedEventStats = serialize(eventStats, initialState);

    expect(nextState).toEqual({
      ...initialState,
      loading: false,
      eventStats: serializedEventStats,
      eventStatsMeta
    });

    // Assert on projection keys
    const projectedStat = serializedEventStats.find((e) => e.isProjected);
    const negativeProjection = eventStats.find((e) => e.isProjected);

    const projectedStat1 = serializedEventStats[0];
    const projectedStat2 = serializedEventStats[1];

    expect(projectedStat1).toHaveProperty('projectedPeriodicRevenue');
    expect(projectedStat1).toHaveProperty('projectedPeriodicInventory');
    expect(projectedStat1).toHaveProperty('projectedRevenue');
    expect(projectedStat1).toHaveProperty('projectedInventory');
    expect(projectedStat1.projectedPeriodicInventory).toBe(0);
    expect(projectedStat1.projectedPeriodicRevenue).toBe(0);

    expect(projectedStat2).toHaveProperty('projectedPeriodicRevenue');
    expect(projectedStat2).toHaveProperty('projectedPeriodicInventory');
    expect(projectedStat2).toHaveProperty('projectedRevenue');
    expect(projectedStat2).toHaveProperty('projectedInventory');
    expect(projectedStat2.projectedPeriodicInventory).toBe(0);
    expect(projectedStat2.projectedPeriodicRevenue).toBe(0);
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
      eventStatsMeta: {
        interval: 'So meta',
        timeZone: 'America/New_York'
      },
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
      eventDateLimits: { from: null, to: null }
    };

    const from = new Date();
    const to = new Date();
    const action = { type: SET_FIRST_AND_LAST_DATE, payload: { from, to } };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      eventDateLimits: { from, to },
      dateRange: { from, to }
    });
  });

  it('should handle DOWNLOAD_EVENT_REPORT', () => {
    const prevState = {
      ...initialState,
      downloading: false
    };

    const action = { type: DOWNLOAD_EVENT_REPORT };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      downloading: true
    });
  });

  it('should handle DOWNLOAD_EVENT_REPORT_SUCCESS', () => {
    const prevState = {
      ...initialState,
      downloading: true
    };

    const action = { type: DOWNLOAD_EVENT_REPORT_SUCCESS };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      downloading: false
    });
  });

  it('should handle DOWNLOAD_EVENT_REPORT_ERROR', () => {
    const error = new Error();
    const prevState = {
      ...initialState,
      downloading: true
    };

    const action = { type: DOWNLOAD_EVENT_REPORT_ERROR, payload: error };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      downloading: false,
      error
    });
  });
});

describe('saga workers', () => {
  it('should handle setDefaultDateRange', () => {
    const generator = cloneableGenerator(setDefaultDateRange)();
    const seasons = [
      {
        id: 1,
        startTimestamp: 1531934104198,
        endTimestamp: 1531934104198
      }
    ];

    const event = {
      id: 1,
      seasonId: 1,
      timestamp: 1531934104198
    };

    expect(generator.next().value).toEqual(
      select(seasonSelectors.selectSeasons)
    );
    expect(generator.next(seasons).value).toEqual(
      select(selectors.selectEvent)
    );

    expect(generator.next(event).value).toEqual(
      put(
        actions.setDateRange({
          from: new Date(seasons[0].startTimestamp),
          to: new Date(event.timestamp)
        })
      )
    );
  });

  it('should handle fetch', () => {
    const generator = cloneableGenerator(fetchEventTimeStats)();
    const dateRange = {
      from: new Date(),
      to: new Date()
    };
    const activeEvent = { id: 1 };

    expect(generator.next().value).toEqual(select(getEventStatFilterArguments));
    expect(generator.next(dateRange).value).toEqual(
      select(selectors.selectEvent)
    );

    expect(generator.next(activeEvent).value).toEqual(
      call(eventStatService.getAll, {
        eventId: 1,
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

  it('should handle download event report', () => {
    const payload = {
      id: 1,
      start: '2018-10-01T00:00:00.00Z',
      end: '2019-01-01T00:00:00.00Z'
    };
    const csv = '"Header1", "Header2", "Header3", "Header4"';
    const blob = new Blob([csv], {
      encoding: 'UTF-8',
      type: 'text/csv;charset=UTF-8'
    });
    const action = actions.downloadEventReport(payload);
    const generator = cloneableGenerator(downloadEventReport)(action);
    expect(generator.next().value).toEqual(
      call(transactionReportService.downloadReport, payload)
    );

    // Download Success
    const successPath = generator.clone();
    expect(successPath.next(blob).value).toEqual(
      call(saveAs, blob, 'TransactionReport.csv')
    );
    expect(successPath.next().value).toEqual(
      put({ type: DOWNLOAD_EVENT_REPORT_SUCCESS })
    );
    expect(successPath.next().value).toEqual(
      put(alertActions.success('Report successfully downloaded'))
    );
    expect(successPath.next().done).toBe(true);

    // Download fail
    const err = new Error();
    const failurePath = generator.clone();
    expect(failurePath.throw(err).value).toEqual(
      put({ type: DOWNLOAD_EVENT_REPORT_ERROR, payload: err })
    );
    expect(failurePath.next(err).value).toEqual(
      put(alertActions.error('Failed to download report'))
    );
  });
});

describe('selectors', () => {
  it('getEventStats selector should return all eventStats', () => {
    const state = {
      eventStat: {
        ...initialState,
        eventStats: [1, 2, 3]
      }
    };

    expect(getEventStats(state)).toEqual([1, 2, 3]);
  });

  it('getEventStatState selector should return eventStat state', () => {
    const state = {
      eventStat: {
        ...initialState,
        eventStats: [1, 2, 3]
      }
    };

    expect(getEventStatState(state)).toEqual(state.eventStat);
  });

  it('getEventStatFilterArguments should return the current dateRange filter', () => {
    const state = {
      eventStat: {
        ...initialState,
        dateRange: {
          from: 1,
          to: 1
        }
      }
    };

    expect(getEventStatFilterArguments(state)).toEqual({ from: 1, to: 1 });
  });

  it('getEventStatDateLimits should return the current eventDateLimits', () => {
    const state = {
      eventStat: {
        ...initialState,
        eventDateLimits: {
          from: 1,
          to: 1
        }
      }
    };

    expect(getEventStatDateLimits(state)).toEqual({ from: 1, to: 1 });
  });
});
