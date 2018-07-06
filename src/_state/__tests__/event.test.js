import { actions, types, selectors, reducer, initialState } from '../event';
import { cloneableGenerator } from 'redux-saga/utils';
import { toggleBroadcasting, fetchEvent } from '../event/saga';
import { call, put } from 'redux-saga/effects';
import { eventService } from '_services';

describe('actions', () => {
  it('should create an action to fetch an event', () => {
    const action = actions.fetchEvent(1);
    expect(action).toEqual({
      type: types.FETCH_EVENT,
      payload: 1
    });
  });

  it('should create an action to set an events broadcasting flag', () => {
    const action = actions.setEventBroadcasting(1, true);
    expect(action).toEqual({
      type: types.TOGGLE_BROADCASTING,
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

  it('should handle FETCH_EVENT', () => {
    const prevState = { ...initialState };
    const action = actions.fetchEvent(1);
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: true
    });
  });

  it('should handle FETCH_EVENT_SUCCESS', () => {
    const prevState = { ...initialState, loading: true };
    const action = { type: types.FETCH_EVENT_SUCCESS, payload: { id: 1 } };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      event: { id: 1 }
    });
  });

  it('should handle FETCH_EVENT_ERROR', () => {
    const prevState = { ...initialState, loading: true };
    const action = { type: types.FETCH_EVENT_ERROR, payload: 'Some Error' };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      error: 'Some Error'
    });
  });

  it('should handle RESET', () => {
    const prevState = {
      ...initialState,
      loading: true,
      event: {},
      error: 'some error'
    };
    const action = { type: types.RESET };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should handle TOGGLE_BROADCASTING', () => {
    const prevState = {
      ...initialState,
      isTogglingBroadcasting: false
    };

    const action = { type: types.TOGGLE_BROADCASTING };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      isTogglingBroadcasting: true
    });
  });

  it('should handle TOGGLE_BROADCASTING_ERROR', () => {
    const prevState = {
      ...initialState,
      isTogglingBroadcasting: true
    };

    const action = { type: types.TOGGLE_BROADCASTING_ERROR };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      isTogglingBroadcasting: false
    });
  });

  it('should handle TOGGLE_BROADCASTING_SUCCESS', () => {
    const prevState = {
      ...initialState,
      isTogglingBroadcasting: true,
      event: { id: 1, isBroadcast: false, modifiedAt: 0 }
    };

    const action = {
      type: types.TOGGLE_BROADCASTING_SUCCESS,
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
      event: { id: 1, isBroadcast: true, modifiedAt: 123 }
    });
  });
});

describe('sagas', () => {
  it('should handle fetchi an individual event', () => {
    const action = actions.fetchEvent(1);
    const generator = cloneableGenerator(fetchEvent)(action);
    expect(generator.next().value).toEqual(call(eventService.getOne, 1));

    const fail = generator.clone();
    const error = new Error('Some API Error');

    expect(generator.next({ id: 1 }).value).toEqual(
      put({ type: types.FETCH_EVENT_SUCCESS, payload: { id: 1 } })
    );

    expect(fail.throw(error).value).toEqual(
      put({ type: types.FETCH_EVENT_ERROR, payload: error })
    );
  });

  it('should handle toggling broadcasting for an event', () => {
    const action = actions.setEventBroadcasting(1, true);
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
        type: types.TOGGLE_BROADCASTING_SUCCESS,
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
      put({ type: types.TOGGLE_BROADCASTING_ERROR, payload: error })
    );
  });
});

describe('selectors', () => {
  it('selectEventTogglingBroadcasting selector should return whether broadcasting is being toggled', () => {
    const state = {
      event: {
        ...initialState,
        isTogglingBroadcasting: true
      }
    };

    expect(selectors.selectEventTogglingBroadcasting(state)).toEqual(true);
  });
});
