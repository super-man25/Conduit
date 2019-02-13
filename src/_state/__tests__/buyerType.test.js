import { buyerTypeService } from '_services';
import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { fetchBuyerTypes } from '_state/buyerType/saga';
import {
  selectors,
  actions,
  types,
  reducer,
  initialState
} from '_state/buyerType';

describe('actions', () => {
  it('should create an action to fetch buyer types', () => {
    const action = actions.fetchBuyerTypes();
    expect(action).toEqual({ type: types.FETCH_BUYER_TYPES });
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should handle FETCH_BUYER_TYPES', () => {
    const prevState = {
      ...initialState,
      loading: false
    };

    const action = { type: types.FETCH_BUYER_TYPES };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: true
    });
  });

  it('should handle FETCH_BUYER_TYPES_SUCCESS', () => {
    const prevState = {
      ...initialState,
      loading: true
    };

    const buyerTypes = [{ publicDescription: 'Adult' }];
    const action = {
      type: types.FETCH_BUYER_TYPES_SUCCESS,
      payload: buyerTypes
    };

    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      buyerTypes
    });
  });

  it('should handle FETCH_BUYER_TYPES_ERROR', () => {
    const prevState = {
      ...initialState,
      loading: true
    };

    const action = {
      type: types.FETCH_BUYER_TYPES_ERROR,
      payload: 'An error'
    };

    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      error: 'An error'
    });
  });
});

describe('saga workers', () => {
  it('should handle fetch', () => {
    const action = actions.fetchBuyerTypes();
    const generator = cloneableGenerator(fetchBuyerTypes)(action);
    expect(generator.next().value).toEqual(call(buyerTypeService.getAll));

    const success = generator.clone();
    const buyerTypes = [{ publicDescription: 'Adult' }];

    expect(success.next(buyerTypes).value).toEqual(
      put({ type: types.FETCH_BUYER_TYPES_SUCCESS, payload: buyerTypes })
    );
    expect(success.next().done).toBe(true);

    const fail = generator.clone();
    const error = new Error('some API error');

    expect(fail.throw(error).value).toEqual(
      put({ type: types.FETCH_BUYER_TYPES_ERROR, payload: error })
    );
  });
});

describe('selectors', () => {
  it('should select all buyer types', () => {
    const store = {
      buyerType: {
        ...initialState,
        buyerTypes: [1, 2, 3]
      }
    };

    expect(selectors.selectAllBuyerTypes(store)).toEqual([1, 2, 3]);
  });
});
