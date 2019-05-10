import { buyerTypeService } from '_services';
import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { fetchBuyerTypes, updateBuyerTypes } from '_state/buyerType/saga';
import { actions as alertActions } from '_state/alert';
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

  it('should create an action to update buyer types', () => {
    const bts = [{ id: '3161', code: 'ADULT' }];
    const action = actions.updateBuyerTypes(bts);
    expect(action).toEqual({ type: types.UPDATE_BUYER_TYPES, payload: bts });
  });

  it('should create an action to open the buyer types modal', () => {
    const action = actions.openBuyerTypesModal();
    expect(action).toEqual({ type: types.OPEN_BUYER_TYPES_MODAL });
  });

  it('should create an action to close the buyer types modal', () => {
    const action = actions.closeBuyerTypesModal();
    expect(action).toEqual({ type: types.CLOSE_BUYER_TYPES_MODAL });
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

  it('should handle UPDATE_BUYER_TYPES', () => {
    const prevState = {
      ...initialState,
      loading: false
    };

    const bts = [
      { id: '3161', code: 'ADULT', disabled: true },
      { id: '3162', code: 'CHILD', disabled: false }
    ];
    const action = { type: types.UPDATE_BUYER_TYPES, payload: bts };

    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: true
    });
  });

  it('should handle UPDATE_BUYER_TYPES_SUCCESS', () => {
    const prevState = {
      ...initialState,
      loading: true
    };

    const action = { type: types.UPDATE_BUYER_TYPES_SUCCESS, payload: 2 };

    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      modalIsOpen: false
    });
  });

  it('should handle UPDATE_BUYER_TYPE_ERROR', () => {
    const prevState = {
      ...initialState,
      loading: true
    };

    const err = { code: 409, body: { proVenuePricingRules: [1] } };
    const action = {
      type: types.UPDATE_BUYER_TYPES_ERROR,
      payload: err
    };

    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      error: err
    });
  });

  it('should handle OPEN_BUYER_TYPES_MODAL', () => {
    const prevState = { ...initialState };

    const action = { type: types.OPEN_BUYER_TYPES_MODAL };

    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      modalIsOpen: true
    });
  });

  it('should handle CLOSE_BUYER_TYPES_MODAL', () => {
    const prevState = { ...initialState, modalIsOpen: true, err: 'An error' };

    const action = { type: types.CLOSE_BUYER_TYPES_MODAL };

    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      modalIsOpen: false,
      error: null
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
      put(alertActions.error('Failed to Fetch Buyer Types'))
    );

    expect(fail.next().value).toEqual(
      put({ type: types.FETCH_BUYER_TYPES_ERROR, payload: error })
    );
  });

  it('should handle update', () => {
    const bts = [{ id: '3161', code: 'ADULT', disabled: false }];
    const action = actions.updateBuyerTypes(bts);
    const generator = cloneableGenerator(updateBuyerTypes)(action);
    expect(generator.next().value).toEqual(
      call(buyerTypeService.updateMultiple, bts)
    );

    const success = generator.clone();

    expect(success.next(1).value).toEqual(
      put({ type: types.UPDATE_BUYER_TYPES_SUCCESS, payload: 1 })
    );

    expect(success.next().value).toEqual(
      put(alertActions.success('Updated Buyer Types'))
    );
    expect(success.next().done).toBe(true);

    const fail = generator.clone();
    const error = new Error('some API error');

    expect(fail.throw(error).value).toEqual(
      put({ type: types.UPDATE_BUYER_TYPES_ERROR, payload: error })
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

  it('should return boolean representing whether the buyer types are loading', () => {
    const store = {
      buyerType: {
        ...initialState,
        loading: true
      }
    };

    expect(selectors.selectIsLoading(store)).toEqual(true);
  });

  it('should return boolean representing whether the buyer type modal is open', () => {
    const store = {
      buyerType: {
        ...initialState
      }
    };

    expect(selectors.selectModalIsOpen(store)).toEqual(false);
  });

  it('should select the buyer type error property if it is set', () => {
    const error = new Error();
    const store = {
      buyerType: {
        ...initialState,
        error
      }
    };

    expect(selectors.selectError(store)).toEqual(error);
  });
});
