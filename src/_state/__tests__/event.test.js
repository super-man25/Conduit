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
  VISIBLE_EVENTS
} from '_state/event/actions';
import {
  fetchAsync,
  handleSearchInput,
  fuzzySearch,
  initFuse
} from '_state/event/saga';
import { initialState } from '_state/event/reducer';
import { getEvents, getSearchFilter } from '_state/event/selectors';

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
});
