import { priceRuleService } from '_services';
import { call, put, select } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import {
  fetchPriceRules,
  savePriceRule,
  fetchOnePriceRule
} from '_state/priceRule/saga';
import { actions as alertActions } from '_state/alert';
import {
  selectors,
  actions,
  types,
  reducer,
  initialState
} from '_state/priceRule';

import { emptyEDPriceRule } from '_models/priceRule';

describe('actions', () => {
  it('should create an action to fetch price rules', () => {
    const action = actions.fetchPriceRules();
    expect(action).toEqual({
      type: types.FETCH_PRICE_RULES,
      payload: null
    });
  });

  it('should create an action to start editing price rule', () => {
    const action = actions.startEditingPriceRule(1);
    expect(action).toEqual({
      type: types.START_EDIT_PRICE_RULE,
      payload: 1
    });
  });

  it('should create an action to cancel editing price rule', () => {
    const action = actions.cancelEditingPriceRule(1);
    expect(action).toEqual({
      type: types.CANCEL_EDIT_PRICE_RULE,
      payload: 1
    });
  });

  it('should create an action to save price rule', () => {
    const action = actions.saveEditedPriceRule(1);
    expect(action).toEqual({
      type: types.SAVE_EDITED_PRICE_RULE,
      payload: 1
    });
  });

  it('should create an action to update a price rule property', () => {
    const action = actions.updatePriceRuleProperty({
      propertyName: 'constant',
      propertyValue: 1,
      id: 3
    });

    expect(action).toEqual({
      type: types.UPDATE_PRICE_RULE_PROPERTY,
      payload: {
        propertyName: 'constant',
        propertyValue: 1,
        id: 3
      }
    });
  });

  it('should create a new price rule', () => {
    const action = actions.createPriceRule();
    expect(action).toEqual({
      type: types.CREATE_PRICE_RULE,
      payload: null
    });
  });

  it('should reset price rules', () => {
    const action = actions.resetPriceRules();
    expect(action).toEqual({
      type: types.RESET_PRICE_RULES,
      payload: null
    });
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it('should handle FETCH_PRICE_RULES', () => {
    const prevState = {
      ...initialState,
      loading: false
    };

    const action = { type: types.FETCH_PRICE_RULES };

    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('should handle FETCH_PRICE_RULES_SUCCESS', () => {
    const prevState = {
      ...initialState,
      loading: true
    };

    const priceRules = [{ id: 2, name: '50% off' }];
    const action = {
      type: types.FETCH_PRICE_RULES_SUCCESS,
      payload: priceRules
    };

    const nextState = reducer(prevState, action);
    expect(nextState).toEqual({
      ...initialState,
      loading: false,
      allRows: [
        {
          id: 2,
          name: '50% off'
        }
      ]
    });
  });

  it('should handle FETCH_PRICE_RULES_ERROR', () => {
    const prevState = {
      ...initialState,
      loading: true
    };

    const action = { type: types.FETCH_PRICE_RULES_ERROR, payload: 'An error' };

    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      loading: false,
      error: 'An error'
    });
  });

  it('should handle START_EDIT_PRICE_RULE', () => {
    const prevState = {
      ...initialState,
      allRows: [{ id: 1 }, { id: -2 }]
    };

    const action = { type: types.START_EDIT_PRICE_RULE, payload: 1 };

    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      editingRowId: 1,
      editingRowState: { id: 1 },
      allRows: [{ id: 1 }, { id: -2 }]
    });
  });

  describe('should handle CANCEL_EDITING_PRICE_RULE', () => {
    it('with saved price rule', () => {
      const prevState = {
        ...initialState,
        editingRowId: 1,
        editingRowState: { id: 1, constant: 2 },
        allRows: [{ id: 1 }, { id: -3 }, { id: 70 }]
      };

      const action = { type: types.CANCEL_EDIT_PRICE_RULE, payload: 1 };
      const nextState = reducer(prevState, action);
      expect(nextState).toEqual({
        ...initialState,
        editingRowId: null,
        editingRowState: {},
        allRows: [{ id: 1 }, { id: -3 }, { id: 70 }]
      });
    });

    it('with an unsaved price rule', () => {
      const prevState = {
        ...initialState,
        editingRowId: 0,
        editingRowState: { id: 0, percent: -20, mirroPriceScaleId: 2383 },
        allRows: [{ id: 0 }, { id: 1 }, { id: 70 }]
      };

      const action = { type: types.CANCEL_EDIT_PRICE_RULE, payload: 0 };
      const nextState = reducer(prevState, action);
      expect(nextState).toEqual({
        ...initialState,
        allRows: [{ id: 1 }, { id: 70 }]
      });
    });
  });

  it('should handle UPDATE_PRICE_RULE_PROPERTY', () => {
    const prevState = {
      ...initialState,
      editingRowId: 3,
      editingRowState: { id: 3, constant: 2 },
      allRows: [
        { id: 3, constant: 2 },
        {
          id: 5,
          percent: -40
        }
      ]
    };

    const action = {
      type: types.UPDATE_PRICE_RULE_PROPERTY,
      payload: { id: 3, propertyName: 'constant', propertyValue: 13 }
    };

    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      editingRowId: 3,
      editingRowState: { id: 3, constant: 13 },
      allRows: [
        {
          id: 3,
          constant: 2
        },
        {
          id: 5,
          percent: -40
        }
      ]
    });
  });

  it('should handle CREATE_PRICE_RULE', () => {
    const prevState = initialState;
    const action = { type: types.CREATE_PRICE_RULE };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...initialState,
      editingRowId: 0,
      editingRowState: { ...emptyEDPriceRule, id: 0 },
      allRows: [{ ...emptyEDPriceRule, id: 0 }]
    });
  });

  it('should handle RESET_PRICE_RULES', () => {
    const prevState = {
      ...initialState,
      allRows: [{ id: 10 }]
    };

    const action = { type: types.RESET_PRICE_RULES };
    const nextState = reducer(prevState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should handle SAVE_PRICE_RULE', () => {
    const prevState = {
      ...initialState,
      loading: false
    };

    const action = { type: types.SAVE_PRICE_RULE };

    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: true
    });
  });

  it('should handle SAVE_PRICE_RULE_SUCCESS', () => {
    const prevState = {
      ...initialState,
      editingRowId: 1,
      editingRowState: { id: 1, constant: 2 },
      loading: true,
      allRows: [{ id: 0 }]
    };

    const action = { type: types.SAVE_PRICE_RULE_SUCCESS, payload: 1 };

    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false
    });
  });

  it('should handle SAVE_PRICE_RULE_ERROR', () => {
    const prevState = {
      ...initialState,
      loading: true
    };

    const action = {
      type: types.SAVE_PRICE_RULE_ERROR,
      payload: 'Could Not Save Price Rule'
    };

    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      error: 'Could Not Save Price Rule'
    });
  });

  it('should handle FETCH_PRICE_RULE', () => {
    const prevState = initialState;

    const priceRuleId = 1;
    const action = { type: types.FETCH_PRICE_RULE, payload: priceRuleId };

    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: true
    });
  });

  describe('should handle FETCH_PRICE_RULE_SUCCESS', () => {
    let prevState;
    beforeEach(() => {
      prevState = {
        ...initialState,
        loading: true,
        allRows: [{ id: 2 }, { id: 3 }, { id: 4 }]
      };
    });

    it('when rule already exists', () => {
      const fetchedPriceRule = { id: 3, percent: -30 };
      const action = {
        type: types.FETCH_PRICE_RULE_SUCCESS,
        payload: fetchedPriceRule
      };

      const nextState = reducer(prevState, action);

      expect(nextState).toEqual({
        ...prevState,
        loading: false,
        allRows: [{ id: 2 }, { id: 3, percent: -30 }, { id: 4 }]
      });
    });

    it('when rule is new', () => {
      const fetchedPriceRule = { id: 7, percent: 10 };
      const action = {
        type: types.FETCH_PRICE_RULE_SUCCESS,
        payload: fetchedPriceRule
      };

      const nextState = reducer(prevState, action);

      expect(nextState).toEqual({
        ...prevState,
        loading: false,
        allRows: [{ id: 3 }, { id: 4 }, { id: 7, percent: 10 }]
      });
    });
  });

  it('should handle FETCH_PRICE_RULE_ERROR', () => {
    const prevState = {
      ...initialState,
      loading: true
    };

    const action = {
      type: types.FETCH_PRICE_RULE_ERROR,
      payload: 'Could Not Fetch Price Rule'
    };

    const nextState = reducer(prevState, action);

    expect(nextState).toEqual({
      ...prevState,
      loading: false,
      error: 'Could Not Fetch Price Rule'
    });
  });
});

describe('saga workers', () => {
  it('should handle fetch', () => {
    const action = actions.fetchPriceRules();
    const generator = cloneableGenerator(fetchPriceRules)(action);
    expect(generator.next().value).toEqual(call(priceRuleService.getAll));

    const success = generator.clone();
    const priceRules = [{ id: 3 }];

    expect(success.next(priceRules).value).toEqual(
      put({ type: types.FETCH_PRICE_RULES_SUCCESS, payload: priceRules })
    );
    expect(success.next().done).toBe(true);

    const fail = generator.clone();
    const error = new Error('some API error');

    expect(fail.throw(error).value).toEqual(
      put(alertActions.error('Failed to Fetch Price Rules'))
    );

    expect(fail.next().value).toEqual(
      put({ type: types.FETCH_PRICE_RULES_ERROR, payload: error })
    );
  });

  it('should handle save', () => {
    const action = actions.savePriceRule();
    const generator = cloneableGenerator(savePriceRule)(action);
    expect(generator.next().value).toEqual(
      select(selectors.selectEditingPriceRule)
    );

    const success = generator.clone();
    const priceRule = { id: 3 };

    expect(success.next(priceRule).value).toEqual(
      call(priceRuleService.update, priceRule)
    );

    expect(success.next(priceRule).value).toEqual(
      put({ type: types.SAVE_PRICE_RULE_SUCCESS, payload: priceRule })
    );

    expect(success.next().value).toEqual(
      put(alertActions.success('Successfully saved price rule'))
    );
    expect(success.next().done).toBe(true);

    const fail = generator.clone();
    const error = new Error('some API error');

    expect(fail.throw(error).value).toEqual(
      put({ type: types.SAVE_PRICE_RULE_ERROR, payload: error })
    );
  });

  it('should handle fetch one', () => {
    const action = actions.fetchPriceRule(1);
    const generator = cloneableGenerator(fetchOnePriceRule)(action);

    expect(generator.next().value).toEqual(call(priceRuleService.getOne, 1));

    const success = generator.clone();

    expect(success.next({ id: 1 }).value).toEqual(
      put({
        type: types.FETCH_PRICE_RULE_SUCCESS,
        payload: { id: 1 }
      })
    );

    expect(success.next().done).toBe(true);

    const fail = generator.clone();
    const error = new Error('some API error');

    expect(fail.throw(error).value).toEqual(
      put({ type: types.FETCH_PRICE_RULE_ERROR, payload: error })
    );
  });
});

describe('selectors', () => {
  it('should select all price rules', () => {
    const store = {
      priceRule: {
        ...initialState,
        allRows: [1, 2, 3]
      }
    };

    expect(selectors.selectAllPriceRuleRows(store)).toEqual([1, 2, 3]);
  });

  it('should select all price rules', () => {
    const store = {
      priceRule: {
        ...initialState,
        allRows: [1, 2, 3],
        editingRowState: { id: 1, constant: 2 }
      }
    };

    expect(selectors.selectEditingPriceRule(store)).toEqual({
      id: 1,
      constant: 2
    });
  });

  it('should select if a row is currently being edited', () => {
    const store = {
      priceRule: {
        ...initialState,
        editingRowId: 0
      }
    };

    expect(selectors.selectIsEditingPriceRule(store)).toEqual(true);
  });

  it('should select price rules ids if they are active', () => {
    const store = {
      priceRule: {
        allRows: [
          {
            id: 1,
            externalBuyerTypeIds: ['3161', '1111'],
            isActive: true
          },
          {
            id: 2,
            externalBuyerTypeIds: ['2222', '1111'],
            isActive: true
          },
          {
            id: 3,
            externalBuyerTypeIds: ['5555', '9999'],
            isActive: false
          }
        ]
      }
    };

    expect(selectors.selectBuyerTypesInActivePriceRules(store)).toEqual([
      '3161',
      '1111',
      '2222'
    ]);
  });
});
