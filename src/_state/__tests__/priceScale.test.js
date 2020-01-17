import { priceScaleService } from '_services';
import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { fetchPriceScales } from '_state/priceScale/saga';
import {
  selectors,
  actions,
  types,
  reducer,
  initialState,
} from '_state/priceScale';

describe('actions', () => {
  it('should create an action to fetch price scales', () => {
    const action = actions.fetchPriceScales();
    expect(action).toEqual({ type: types.FETCH_PRICE_SCALES });
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should handle FETCH_PRICE_SCALES', () => {
    const prevState = {
      ...initialState,
      loading: false,
    };

    const action = { type: types.FETCH_PRICE_SCALES };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: true,
    });
  });

  it('should handle FETCH_PRICE_SCALES_SUCCESS', () => {
    const prevState = {
      ...initialState,
      loading: true,
    };

    const priceScales = [{ name: 'Dugout Club' }];
    const action = {
      type: types.FETCH_PRICE_SCALES_SUCCESS,
      payload: priceScales,
    };

    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      priceScales,
    });
  });

  it('should handle FETCH_PRICE_SCALES_ERROR', () => {
    const prevState = {
      ...initialState,
      loading: true,
    };

    const action = {
      type: types.FETCH_PRICE_SCALES_ERROR,
      payload: 'An error',
    };

    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      error: 'An error',
    });
  });
});

describe('saga workers', () => {
  it('should handle fetch', () => {
    const action = actions.fetchPriceScales();
    const generator = cloneableGenerator(fetchPriceScales)(action);
    expect(generator.next().value).toEqual(call(priceScaleService.getAll));

    const success = generator.clone();
    const priceScales = [{ name: 'Dugout Club' }];

    expect(success.next(priceScales).value).toEqual(
      put({ type: types.FETCH_PRICE_SCALES_SUCCESS, payload: priceScales })
    );
    expect(success.next().done).toBe(true);

    const fail = generator.clone();
    const error = new Error('some API error');

    expect(fail.throw(error).value).toEqual(
      put({ type: types.FETCH_PRICE_SCALES_ERROR, payload: error })
    );
  });
});

describe('selectors', () => {
  it('should select all price scales', () => {
    const store = {
      priceScale: {
        ...initialState,
        priceScales: [1, 2, 3],
      },
    };

    expect(selectors.selectAllPriceScales(store)).toEqual([1, 2, 3]);
  });
});
