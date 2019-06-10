import { call, put, select, delay } from 'redux-saga/effects';
import {
  fetch,
  paramsChanged,
  FETCH,
  PARAMS_CHANGED,
  RESET,
  FETCH_ASYNC,
  FETCH_SUCCESS,
  FETCH_ERROR
} from '../pricingPreview/actions';
import {
  fetchPricingPreview,
  fetchPricingPreviewDebounced
} from '../pricingPreview/saga';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import reducer, { initialState } from '../pricingPreview/reducer';
import { selectors as eventSelectors } from '_state/event';
import { eventService } from '_services';

describe('actions', () => {
  it('should create an action to fetch a new pricing preview', () => {
    const action = fetch(1);
    expect(action).toEqual({
      type: FETCH,
      payload: {
        eventId: 1
      }
    });
  });

  it('should create an action when params change', () => {
    const action = paramsChanged(1);
    expect(action).toEqual({
      type: PARAMS_CHANGED,
      payload: {
        eventId: 1
      }
    });
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should handle RESET', () => {
    const prevState = { ...initialState };
    const action = { type: RESET };
    const nextState = reducer(prevState, action);
    expect(nextState).toEqual(prevState);
  });

  it('should handle FETCH_ASYNC', () => {
    const prevState = { ...initialState };
    const action = { type: FETCH_ASYNC };
    const nextState = reducer(prevState, action);
    expect(nextState).toEqual({
      ...prevState,
      loading: true
    });
  });

  it('should handle FETCH_SUCCESS', () => {
    const prevState = { ...initialState };
    const action = { type: FETCH_SUCCESS, payload: 'record' };
    const nextState = reducer(prevState, action);
    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      record: 'record'
    });
  });

  it('should handle FETCH_ERROR', () => {
    const prevState = { ...initialState };
    const action = { type: FETCH_ERROR };
    const nextState = reducer(prevState, action);
    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      error: undefined
    });
  });
});

describe('sagas', () => {
  it('should debounce the Pricing Preview saga', () => {
    const action = paramsChanged(1);
    const generator = cloneableGenerator(fetchPricingPreviewDebounced)(action);
    expect(generator.next().value).toEqual(delay(200));
    expect(generator.next().value).toEqual(put({ ...action, type: FETCH }));
  });

  it('should fetch pricing preview', () => {
    const pendingFactors = {
      eventScore: 1,
      eventScoreModifier: 1,
      spring: 1,
      springModifier: 1
    };
    const action = fetch(1);
    const generator = cloneableGenerator(fetchPricingPreview)(action);
    expect(generator.next().value).toEqual(
      select(eventSelectors.selectPendingFactors)
    );

    expect(generator.next(pendingFactors).value).toEqual(
      put({ type: FETCH_ASYNC })
    );

    expect(generator.next().value).toEqual(
      call(eventService.getPricingPreview, 1, 2, 2)
    );
    // success path
    const success = generator.clone();
    const pricingPreview = 'pricingPreview';
    expect(success.next(pricingPreview).value).toEqual(
      put({ type: FETCH_SUCCESS, payload: pricingPreview })
    );

    // fail path
    const fail = generator.clone();
    const error = new Error('some api error');
    expect(fail.throw(error).value).toEqual(
      put({ type: FETCH_ERROR, payload: error })
    );
  });
});
