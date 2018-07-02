import { eventService } from '_services';
import { delay } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { actions, reducer } from '_state/event';
import {
  FETCH_ASYNC,
  FETCH_ERROR,
  FETCH_SUCCESS,
  RESET,
  VISIBLE_EVENTS,
  SET_ACTIVE_ID,
  SET_BROADCASTING,
  SET_BROADCASTING_ERROR,
  SET_BROADCASTING_SUCCESS
} from '_state/event/actions';
import {
  fetchAsync,
  handleSearchInput,
  fuzzySearch,
  initFuse,
  toggleBroadcasting
} from '_state/event/saga';
import { initialState } from '_state/event/reducer';
import {
  getEvents,
  getSearchFilter,
  getActiveEventId,
  getActiveEvent,
  getTogglingBroadcasting
} from '_state/event/selectors';

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

  it('should create an action to setActiveId', () => {
    const action = actions.setActive(1);
    expect(action).toEqual({
      type: SET_ACTIVE_ID,
      payload: 1
    });
  });

  it('should create an action to set whether an event is broadcasting', () => {
    const action = actions.setBroadcasting(1, true);
    expect(action).toEqual({
      type: SET_BROADCASTING,
      payload: {
        eventId: 1,
        isBroadcast: true
      }
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

    const action = { type: FETCH_ASYNC, payload: true };
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

    const events = [{ name: 'Cardinals at Mets' }];
    const action = { type: FETCH_SUCCESS, payload: events };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      events
    });
  });

  it('should handle VISIBLE_EVENTS', () => {
    const events = [{ name: 'Cardinals at Mets' }];

    const prevState = {
      loading: false,
      events,
      visibleEvents: [],
      filter: ''
    };

    const action = { type: VISIBLE_EVENTS, payload: events };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      visibleEvents: events
    });
  });

  it('should handle FETCH_ERROR', () => {
    const prevState = {
      loading: true,
      events: [],
      visibleEvents: [],
      filter: ''
    };

    const action = { type: FETCH_ERROR };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false
    });
  });

  it('should handle RESET', () => {
    const events = [{ name: 'Cardinals at Mets' }];

    const prevState = {
      ...initialState,
      events,
      visibleEvents: events
    };

    const action = { type: RESET };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should handle SET_BROADCASTING', () => {
    const prevState = {
      ...initialState,
      isTogglingBroadcasting: false
    };

    const action = { type: SET_BROADCASTING };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      isTogglingBroadcasting: true
    });
  });

  it('should handle SET_BROADCASTING_ERROR', () => {
    const prevState = {
      ...initialState,
      isTogglingBroadcasting: true
    };

    const action = { type: SET_BROADCASTING_ERROR };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      isTogglingBroadcasting: false
    });
  });

  it('should handle SET_BROADCASTING_SUCCESS', () => {
    const prevState = {
      ...initialState,
      isTogglingBroadcasting: true,
      events: [{ id: 1, isBroadcast: false, modifiedAt: 0 }]
    };

    const action = {
      type: SET_BROADCASTING_SUCCESS,
      payload: {
        eventId: 1,
        isBroadcast: true,
        modifiedAt: 123
      }
    };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      isTogglingBroadcasting: false,
      events: [{ id: 1, isBroadcast: true, modifiedAt: 123 }]
    });
  });
});

describe('saga workers', () => {
  it('should handle fetch', () => {
    const action = actions.fetch();
    const generator = cloneableGenerator(fetchAsync)(action);
    expect(generator.next().value).toEqual(call(eventService.getAll));

    const success = generator.clone();
    const events = [{ name: 'Cardinals at Mets' }];

    expect(success.next(events).value).toEqual(
      put({ type: FETCH_SUCCESS, payload: events })
    );
    expect(success.next(events).value).toEqual(
      put({ type: VISIBLE_EVENTS, payload: events })
    );
    expect(success.next().value).toEqual(call(initFuse, events));
    expect(success.next().done).toBe(true);

    const fail = generator.clone();
    const error = new Error('some API error');

    expect(fail.throw(error).value).toEqual(
      put({ type: FETCH_ERROR, payload: error })
    );
  });

  it('should handle search', () => {
    const events = [{ name: 'Cardinals at Mets' }];
    const action = actions.search();
    const generator = cloneableGenerator(handleSearchInput)(action);

    expect(generator.next().value).toEqual(call(delay, 500));
    expect(generator.next().value).toEqual(select(getSearchFilter));

    const filter = generator.clone();
    expect(filter.next('cardinals').value).toEqual(
      call(fuzzySearch, 'cardinals')
    );

    expect(filter.next(events).value).toEqual(
      put({ type: VISIBLE_EVENTS, payload: events })
    );

    const noFilter = generator.clone();

    expect(noFilter.next().value).toEqual(select(getEvents));
    expect(noFilter.next(events).value).toEqual(
      put({ type: VISIBLE_EVENTS, payload: events })
    );
  });

  it('should handle toggleing broadcasting for an event', () => {
    const action = actions.setBroadcasting(1, true);
    const generator = cloneableGenerator(toggleBroadcasting)(action);

    expect(generator.next().value).toEqual(
      call(
        eventService.toggleBroadcasting,
        action.payload.eventId,
        action.payload.isBroadcast
      )
    );

    const success = generator.clone();

    expect(success.next({ modifiedAt: 123, isBroadcast: true }).value).toEqual(
      put({
        type: SET_BROADCASTING_SUCCESS,
        payload: {
          eventId: action.payload.eventId,
          modifiedAt: 123,
          isBroadcast: true
        }
      })
    );

    const fail = generator.clone();
    const error = new Error('some api error');

    expect(fail.throw(error).value).toEqual(
      put({ type: SET_BROADCASTING_ERROR, payload: error })
    );
  });
});

describe('selectors', () => {
  it('getEvents selector should return all events', () => {
    const state = {
      event: {
        ...initialState,
        events: [1, 2, 3]
      }
    };

    expect(getEvents(state)).toEqual([1, 2, 3]);
  });

  it('getSearchFilter selector should return the current search filter', () => {
    const state = {
      event: {
        ...initialState,
        filter: 'Some filter'
      }
    };

    expect(getSearchFilter(state)).toEqual('Some filter');
  });

  it('getActiveEventId selector should return the current active eventId', () => {
    const state = {
      event: {
        ...initialState,
        events: [{ id: 1 }, { id: 2 }]
      },
      router: {
        location: {
          pathname: '/event/2'
        }
      }
    };

    expect(getActiveEventId(state)).toEqual(2);
  });

  it('getActiveEvent selector should return the current active event', () => {
    const state = {
      event: {
        ...initialState,
        events: [{ id: 1 }, { id: 2 }]
      },
      router: {
        location: {
          pathname: '/event/2'
        }
      }
    };

    expect(getActiveEvent(state)).toEqual({ id: 2 });
  });

  it('getTogglingBroadcasting selector should return whether broadcasting is being toggled', () => {
    const state = {
      event: {
        ...initialState,
        isTogglingBroadcasting: true
      }
    };

    expect(getTogglingBroadcasting(state)).toEqual(true);
  });
});
