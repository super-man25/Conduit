import { cloneableGenerator } from '@redux-saga/testing-utils';
import { call, put } from 'redux-saga/effects';
import { eventService } from '_services';
import alertActions from '_state/alert/actions';
import { types as eventListTypes } from '_state/eventList';
import { paramsChanged } from '_state/pricingPreview/actions';
import { actions, initialState, reducer, selectors, types } from '../event';
import {
  fetchAutomatedSpring,
  fetchEvent,
  saveAdminModifiers,
  toggleBroadcasting
} from '../event/saga';

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

  it('should create an action to save admin modifiers', () => {
    const action = actions.saveAdminModifiers(1, 1, 1, 1);
    expect(action).toEqual({
      type: types.SAVE_ADMIN_MODIFIERS,
      payload: {
        eventId: 1,
        eventScoreModifier: 1,
        springModifier: 1,
        seasonId: 1
      }
    });
  });

  it('should create an action to fetch automated spring value', () => {
    const action = actions.fetchAutomatedSpringValue(1, 1);
    expect(action).toEqual({
      type: types.FETCH_AUTOMATED_SPRING_VALUE,
      payload: {
        id: 1,
        eventScore: 1
      }
    });
  });

  it('should create an action to handle modifier input changes', () => {
    const action = actions.handleModifierChange('eventScoreModifier', '1');
    expect(action).toEqual({
      type: types.HANDLE_MODIFIER_CHANGE,
      payload: {
        name: 'eventScoreModifier',
        value: '1'
      }
    });
  });

  it('should create an action to reset to initial factors', () => {
    const action = actions.resetToInitialFactors();
    expect(action).toEqual({
      type: types.RESET_TO_INITIAL_FACTORS
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
    const action = {
      type: types.FETCH_EVENT_SUCCESS,
      payload: {
        eventScore: 1,
        eventScoreModifier: 1,
        spring: 1,
        springModifier: 1
      }
    };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      event: {
        eventScore: 1,
        eventScoreModifier: 1,
        spring: 1,
        springModifier: 1
      },
      pendingFactors: {
        eventScore: 1,
        eventScoreModifier: 1,
        spring: 1,
        springModifier: 1
      }
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

  it('should handle SAVE_ADMIN_MODIFIERS', () => {
    const prevState = {
      ...initialState,
      savingAdminModifiers: false
    };

    const action = {
      type: types.SAVE_ADMIN_MODIFIERS,
      payload: {
        eventId: 1,
        eventScoreModifier: 1,
        springModifier: 1,
        seasonId: 1
      }
    };

    const nextState = reducer(prevState, action);
    expect(nextState).toEqual({
      ...prevState,
      savingAdminModifiers: true
    });
  });

  it('should handle SAVE_ADMIN_MODIFIERS_ERROR', () => {
    const prevState = {
      ...initialState,
      savingAdminModifiers: true
    };

    const error = new Error('saving error');

    const action = {
      type: types.SAVE_ADMIN_MODIFIERS_ERROR,
      payload: error
    };

    const nextState = reducer(prevState, action);
    expect(nextState).toEqual({
      ...prevState,
      savingAdminModifiers: false,
      pricingError: error
    });
  });

  it('should handle SAVE_ADMIN_MODIFIERS_SUCCESS', () => {
    const prevState = {
      ...initialState,
      event: {
        eventScore: 0,
        eventScoreModifier: 0,
        spring: 0,
        springModifier: 0
      },
      savingAdminModifiers: true
    };

    const action = {
      type: types.SAVE_ADMIN_MODIFIERS_SUCCESS,
      payload: {
        eventScore: 1,
        eventScoreModifier: 1,
        spring: 1,
        springModifier: 1
      }
    };

    const nextState = reducer(prevState, action);
    expect(nextState).toEqual({
      ...prevState,
      event: {
        eventScore: 1,
        eventScoreModifier: 1,
        spring: 1,
        springModifier: 1
      },
      pendingFactors: {
        eventScore: 1,
        eventScoreModifier: 1,
        spring: 1,
        springModifier: 1
      },
      savingAdminModifiers: false,
      pricingError: null
    });
  });

  it('should handle FETCH_AUTOMATED_SPRING_VALUE', () => {
    const prevState = {
      ...initialState,
      fetchingSpring: false
    };

    const action = {
      type: types.FETCH_AUTOMATED_SPRING_VALUE
    };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      fetchingSpring: true
    });
  });

  it('should handle FETCH_AUTOMATED_SPRING_VALUE_ERROR', () => {
    const prevState = {
      ...initialState,
      fetchingSpring: true,
      springError: null
    };

    const message = 'Unable to fetch automated spring value';

    const action = {
      type: types.FETCH_AUTOMATED_SPRING_VALUE_ERROR,
      payload: message
    };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      fetchingSpring: false,
      springError: message
    });
  });

  it('should handle FETCH_AUTOMATED_SPRING_VALUE_SUCCESS', () => {
    const prevState = {
      ...initialState,
      fetchingSpring: true,
      pendingFactors: {
        spring: 1
      }
    };

    const action = {
      type: types.FETCH_AUTOMATED_SPRING_VALUE_SUCCESS,
      payload: 2
    };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      fetchingSpring: false,
      pendingFactors: {
        spring: 2
      }
    });
  });
});

describe('sagas', () => {
  it('should handle fetch an individual event', () => {
    const action = actions.fetchEvent(1);
    const generator = cloneableGenerator(fetchEvent)(action);
    const mockEvent = { id: 1, eventScore: 5.0, eventScoreModifier: 0.21 };
    expect(generator.next().value).toEqual(call(eventService.getOne, 1));

    const fail = generator.clone();
    const error = new Error('Some API Error');

    expect(generator.next(mockEvent).value).toEqual(
      put({
        type: types.FETCH_EVENT_SUCCESS,
        payload: mockEvent
      })
    );

    expect(generator.next().value).toEqual(
      put({
        type: types.FETCH_AUTOMATED_SPRING_VALUE,
        payload: {
          id: mockEvent.id,
          eventScore: mockEvent.eventScore + mockEvent.eventScoreModifier
        }
      })
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

  it('should handle saving admin modifiers for an event', () => {
    const action = actions.saveAdminModifiers(1, 1, 1, 1);
    const generator = cloneableGenerator(saveAdminModifiers)(action);
    expect(generator.next().value).toEqual(
      call(
        eventService.updateAdminModifiers,
        action.payload.eventId,
        action.payload.eventScoreModifier,
        action.payload.springModifier
      )
    );

    // success path
    const success = generator.clone();
    expect(
      success.next({
        eventScore: 1,
        eventScoreModifier: 2,
        spring: 3,
        springModifier: 4
      }).value
    ).toEqual(
      put({
        type: types.SAVE_ADMIN_MODIFIERS_SUCCESS,
        payload: {
          eventScore: 1,
          eventScoreModifier: 2,
          spring: 3,
          springModifier: 4,
          eventId: action.payload.eventId
        }
      })
    );

    expect(success.next().value).toEqual(
      put(alertActions.success('Successfully saved modifier'))
    );

    expect(success.next().value).toEqual(
      put({
        type: eventListTypes.FETCH_EVENT_LIST,
        payload: {
          seasonId: action.payload.seasonId
        }
      })
    );
    // fail path
    const fail = generator.clone();
    const error = new Error('some api error');
    expect(fail.throw(error).value).toEqual(
      put({ type: types.SAVE_ADMIN_MODIFIERS_ERROR, payload: error })
    );

    expect(fail.next().value).toEqual(
      put(alertActions.error(error.toString()))
    );
  });

  it('should handle fetching a predicted spring value', () => {
    const action = actions.fetchAutomatedSpringValue(1, 1);
    const generator = cloneableGenerator(fetchAutomatedSpring)(action);

    expect(generator.next().value).toEqual(
      call(
        eventService.getAutomatedSpringValue,
        action.payload.id,
        action.payload.eventScore
      )
    );

    // success path
    const success = generator.clone();
    expect(success.next(2).value).toEqual(
      put({ type: types.FETCH_AUTOMATED_SPRING_VALUE_SUCCESS, payload: 2 })
    );

    expect(success.next().value).toEqual(put(paramsChanged(action.payload.id)));

    // fail path
    const fail = generator.clone();
    const error = new Error('some api error');

    expect(fail.throw(error).value).toEqual(
      put({
        type: types.FETCH_AUTOMATED_SPRING_VALUE_ERROR,
        payload: error
      })
    );

    expect(fail.next().value).toEqual(put(paramsChanged(action.payload.id)));
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

  it('selectEvent selector should return current Event', () => {
    const store = {
      event: {
        ...initialState,
        event: {
          event: {
            id: 1
          }
        }
      }
    };

    expect(selectors.selectEvent(store)).toEqual({ event: { id: 1 } });
  });

  it('selectPricingError selector should return the pricingError value', () => {
    const error = new Error('some error');
    const store = {
      event: {
        ...initialState,
        pricingError: error
      }
    };

    expect(selectors.selectPricingError(store)).toEqual(error);
  });

  it('selectSavingAdminModifiers selector should return the savingAdminModifiers value', () => {
    const store = {
      event: {
        ...initialState,
        savingAdminModifiers: true
      }
    };

    expect(selectors.selectSavingAdminModifiers(store)).toEqual(true);
  });

  it('selectEvent selector should return current Event', () => {
    const store = {
      event: {
        ...initialState,
        event: {
          pendingFactors: {
            eventScore: 1,
            eventScoreModifier: 1,
            spring: 1,
            springModifier: 1
          }
        }
      }
    };

    expect(selectors.selectEvent(store)).toEqual({
      pendingFactors: {
        eventScore: 1,
        eventScoreModifier: 1,
        spring: 1,
        springModifier: 1
      }
    });
  });
});
