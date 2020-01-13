import { eventService } from '_services';
import { call, delay, put, select } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import {
  fetchAsync,
  handleSearchInput,
  initFuse,
  fuzzySearch,
} from '_state/eventList/saga';
import {
  selectors,
  actions,
  types,
  reducer,
  initialState,
} from '_state/eventList';

describe('actions', () => {
  it('should create an action to fetch events', () => {
    const action = actions.fetchEventList({ seasonId: 1 });
    expect(action).toEqual({
      type: types.FETCH_EVENT_LIST,
      payload: {
        seasonId: 1,
      },
    });
  });

  it('should create an action to clear records', () => {
    const action = actions.resetEventList();
    expect(action).toEqual({
      type: types.RESET,
    });
  });

  it('should create an action to search the eventList', () => {
    const action = actions.searchEventList('filter');
    expect(action).toEqual({
      type: types.SEARCH,
      payload: 'filter',
    });
  });

  it('should create an action to set the visible events', () => {
    const action = actions.setVisibleEvents([]);
    expect(action).toEqual({
      type: types.SET_VISIBLE_EVENTS,
      payload: [],
    });
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should handle FETCH_EVENT_LIST', () => {
    const prevState = {
      ...initialState,
      loading: false,
    };

    const action = { type: types.FETCH_EVENT_LIST };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: true,
    });
  });

  it('should handle FETCH_EVENT_LIST_SUCCESS', () => {
    const prevState = {
      ...initialState,
      loading: true,
    };

    const events = [{ name: 'Cardinals at Mets' }];
    const action = { type: types.FETCH_EVENT_LIST_SUCCESS, payload: events };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      events,
    });
  });

  it('should handle FETCH_EVENT_LIST_ERROR', () => {
    const prevState = {
      ...initialState,
      loading: true,
      events: [],
      visibleEvents: [],
      filter: '',
    };

    const action = {
      type: types.FETCH_EVENT_LIST_ERROR,
      payload: 'Some Error',
    };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      error: 'Some Error',
    });
  });

  it('should handle VISIBLE_EVENTS', () => {
    const events = [{ name: 'Cardinals at Mets' }];

    const prevState = {
      ...initialState,
      loading: false,
      visibleEvents: [],
    };

    const action = { type: types.SET_VISIBLE_EVENTS, payload: events };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      visibleEvents: events,
    });
  });

  it('should handle RESET', () => {
    const events = [{ name: 'Cardinals at Mets' }];

    const prevState = {
      ...initialState,
      events,
      visibleEvents: events,
    };

    const action = { type: types.RESET };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual(initialState);
  });
});

describe('saga workers', () => {
  it('should handle fetch', () => {
    const action = actions.fetchEventList({ seasonId: 1 });
    const generator = cloneableGenerator(fetchAsync)(action);
    expect(generator.next().value).toEqual(
      call(eventService.getAll, { seasonId: 1 })
    );

    const success = generator.clone();
    const events = [{ name: 'Cardinals at Mets' }];

    expect(success.next(events).value).toEqual(
      put({ type: types.FETCH_EVENT_LIST_SUCCESS, payload: events })
    );
    expect(success.next(events).value).toEqual(
      put({ type: types.SET_VISIBLE_EVENTS, payload: events })
    );
    expect(success.next().value).toEqual(call(initFuse, events));
    expect(success.next().done).toBe(true);

    const fail = generator.clone();
    const error = new Error('some API error');

    expect(fail.throw(error).value).toEqual(
      put({ type: types.FETCH_EVENT_LIST_ERROR, payload: error })
    );
  });

  it('should handle search', () => {
    const events = [{ name: 'Cardinals at Mets' }];
    const action = actions.searchEventList('Some Filter');
    const generator = cloneableGenerator(handleSearchInput)(action);

    expect(generator.next().value).toEqual(delay(500));
    expect(generator.next().value).toEqual(
      select(selectors.selectEventListSearchFilter)
    );

    const filter = generator.clone();
    expect(filter.next('cardinals').value).toEqual(
      call(fuzzySearch, 'cardinals')
    );

    expect(filter.next(events).value).toEqual(
      put({ type: types.SET_VISIBLE_EVENTS, payload: events })
    );

    const noFilter = generator.clone();

    expect(noFilter.next().value).toEqual(select(selectors.selectEventList));
    expect(noFilter.next(events).value).toEqual(
      put({ type: types.SET_VISIBLE_EVENTS, payload: events })
    );
  });
});

describe('selectors', () => {
  it('selectEventList selector should return all events', () => {
    const state = {
      eventList: {
        ...initialState,
        events: [1, 2, 3],
      },
    };

    expect(selectors.selectEventList(state)).toEqual([1, 2, 3]);
  });

  it('selectEventListSearchFilter selector should return the current search filter', () => {
    const state = {
      eventList: {
        ...initialState,
        filter: 'Some filter',
      },
    };

    expect(selectors.selectEventListSearchFilter(state)).toEqual('Some filter');
  });

  it('selectActiveEventListId selector should return the current active eventId', () => {
    const state = {
      eventList: {
        ...initialState,
        events: [{ id: 1 }, { id: 2 }],
      },
      router: {
        location: {
          pathname: '/event/2',
        },
      },
    };

    expect(selectors.selectActiveEventListId(state)).toEqual(2);
  });
});
