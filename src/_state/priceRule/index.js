// @flow

import type { EDPriceRule } from '_models/priceRule';
import { emptyEDPriceRule } from '_models/priceRule';

export { default as saga } from './saga';

const FETCH_PRICE_RULES = 'priceRule/FETCH_PRICE_RULES';
const FETCH_PRICE_RULES_SUCCESS = 'priceRule/FETCH_PRICE_RULES_SUCCESS';
const FETCH_PRICE_RULES_ERROR = 'priceRule/FETCH_PRICE_RULES_ERROR';
const RESET_PRICE_RULES = 'priceRule/RESET_PRICE_RULES';
const START_EDIT_PRICE_RULE = 'priceRule/START_EDIT_PRICE_RULE';
const CANCEL_EDIT_PRICE_RULE = 'priceRule/CANCEL_EDIT_PRICE_RULE';
const UPDATE_PRICE_RULE_PROPERTY = 'priceRule/UPDATE_PRICE_RULE_PROPERTY';
const CREATE_PRICE_RULE = 'priceRule/CREATE_PRICE_RULE';
const SAVE_PRICE_RULE = 'priceRule/SAVE_PRICE_RULE';
const SAVE_PRICE_RULE_SUCCESS = 'priceRule/SAVE_PRICE_RULE_SUCCESS';
const SAVE_PRICE_RULE_ERROR = 'priceRule/SAVE_PRICE_RULE_ERROR';
const FETCH_PRICE_RULE = 'priceRule/FETCH_PRICE_RULE';
const FETCH_PRICE_RULE_SUCCESS = 'priceRule/FETCH_PRICE_RULE_SUCCESS';
const FETCH_PRICE_RULE_ERROR = 'priceRule/FETCH_PRICE_RULE_ERROR';
const DELETE_PRICE_RULE = 'priceRule/DELETE_PRICE_RULE';
const DELETE_PRICE_RULE_SUCCESS = 'priceRule/DELETE_PRICE_RULE_SUCCESS';
const DELETE_PRICE_RULE_ERROR = 'priceRule/DELETE_PRICE_RULE_ERROR';

// Action types
export type FetchPriceRulesAction = {
  type: 'priceRule/FETCH_PRICE_RULES',
};

export type FetchPriceRulesSuccessAction = {
  type: 'priceRule/FETCH_PRICE_RULES_SUCCESS',
  payload: EDPriceRule[],
};

export type FetchPriceRulesErrorAction = {
  type: 'priceRule/FETCH_PRICE_RULES_ERROR',
  payload: Error,
};

export type StartEditingPriceRuleAction = {
  type: 'priceRule/START_EDIT_PRICE_RULE',
  payload: number,
};

export type CancelEditingPriceRuleAction = {
  type: 'priceRule/CANCEL_EDIT_PRICE_RULE',
  payload: number,
};

export type ResetPriceRulesAction = {
  type: 'priceRule/RESET_PRICE_RULES',
  payload: null,
};

export type UpdatePriceRulePropertyAction = {
  type: 'priceRule/UPDATE_PRICE_RULE_PROPERTY',
  payload: any,
};

export type CreatePriceRuleAction = {
  type: 'priceRule/CREATE_PRICE_RULE',
  payload: null,
};

export type SavePriceRuleAction = {
  type: 'priceRule/SAVE_PRICE_RULE',
  payload: number,
};

export type SavePriceRuleSuccessAction = {
  type: 'priceRule/SAVE_PRICE_RULE_SUCCESS',
  payload: number,
};

export type SavePriceRuleErrorAction = {
  type: 'priceRule/SAVE_PRICE_RULE_ERROR',
  payload: any,
};

export type FetchPriceRuleAction = {
  type: 'priceRule/FETCH_PRICE_RULE',
  payload: number,
};

export type FetchPriceRuleSuccessAction = {
  type: 'priceRule/FETCH_PRICE_RULE_SUCCESS',
  payload: EDPriceRule,
};

export type FetchPriceRuleErrorAction = {
  type: 'priceRule/FETCH_PRICE_RULE_ERROR',
  payload: any,
};

export type DeletePricingRuleAction = {
  type: 'priceRule/DELETE_PRICE_RULE',
  payload: number,
};

export type DeletePricingRuleSuccessAction = {
  type: 'priceRule/DELETE_PRICE_RULE_SUCCESS',
  payload: any,
};

export type DeletePricingRuleErrorAction = {
  type: 'priceRule/DELETE_PRICE_RULE_ERROR',
  payload: any,
};

export type Action =
  | FetchPriceRulesAction
  | FetchPriceRulesSuccessAction
  | FetchPriceRulesErrorAction
  | StartEditingPriceRuleAction
  | CancelEditingPriceRuleAction
  | ResetPriceRulesAction
  | UpdatePriceRulePropertyAction
  | CreatePriceRuleAction
  | SavePriceRuleAction
  | SavePriceRuleSuccessAction
  | SavePriceRuleErrorAction
  | FetchPriceRuleAction
  | FetchPriceRuleSuccessAction
  | FetchPriceRuleErrorAction
  | DeletePricingRuleAction
  | DeletePricingRuleSuccessAction
  | DeletePricingRuleErrorAction;

export const types = {
  FETCH_PRICE_RULES,
  FETCH_PRICE_RULES_SUCCESS,
  FETCH_PRICE_RULES_ERROR,
  RESET_PRICE_RULES,
  START_EDIT_PRICE_RULE,
  CANCEL_EDIT_PRICE_RULE,
  UPDATE_PRICE_RULE_PROPERTY,
  CREATE_PRICE_RULE,
  SAVE_PRICE_RULE,
  SAVE_PRICE_RULE_SUCCESS,
  SAVE_PRICE_RULE_ERROR,
  FETCH_PRICE_RULE,
  FETCH_PRICE_RULE_SUCCESS,
  FETCH_PRICE_RULE_ERROR,
  DELETE_PRICE_RULE,
  DELETE_PRICE_RULE_SUCCESS,
  DELETE_PRICE_RULE_ERROR,
};

// Actions
const fetchPriceRules = (): FetchPriceRulesAction => ({
  type: FETCH_PRICE_RULES,
});

const startEditingPriceRule = (id: number): StartEditingPriceRuleAction => {
  return {
    type: START_EDIT_PRICE_RULE,
    payload: id,
  };
};

const cancelEditingPriceRule = (id: number): CancelEditingPriceRuleAction => {
  return {
    type: CANCEL_EDIT_PRICE_RULE,
    payload: id,
  };
};

const updatePriceRuleProperty = (
  payload: any
): UpdatePriceRulePropertyAction => {
  return {
    type: UPDATE_PRICE_RULE_PROPERTY,
    payload,
  };
};

const createPriceRule = (): CreatePriceRuleAction => {
  return {
    type: CREATE_PRICE_RULE,
    payload: null,
  };
};

const resetPriceRules = (): ResetPriceRulesAction => ({
  type: RESET_PRICE_RULES,
  payload: null,
});

const savePriceRule = (id: number): SavePriceRuleAction => ({
  type: SAVE_PRICE_RULE,
  payload: id,
});

const fetchPriceRule = (id: number): FetchPriceRuleAction => ({
  type: FETCH_PRICE_RULE,
  payload: id,
});

const deletePriceRule = (id: number): DeletePricingRuleAction => {
  return {
    type: DELETE_PRICE_RULE,
    payload: id,
  };
};

export const actions = {
  fetchPriceRules,
  startEditingPriceRule,
  cancelEditingPriceRule,
  resetPriceRules,
  updatePriceRuleProperty,
  createPriceRule,
  fetchPriceRule,
  savePriceRule,
  deletePriceRule,
};

// State/Reducer
type State = {
  allRows: EDPriceRule[],
  loading: boolean,
  editingRowId: number | null,
  editingRowState: ?any,
  error: ?any,
};

export const initialState: State = {
  allRows: [],
  loading: false,
  editingRowId: null,
  editingRowState: {},
  error: null,
};

type Store = {
  priceRule: State,
};

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case FETCH_PRICE_RULES:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRICE_RULES_SUCCESS:
      return {
        ...state,
        loading: false,
        allRows: action.payload,
      };
    case FETCH_PRICE_RULES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case START_EDIT_PRICE_RULE:
      return {
        ...state,
        editingRowId: action.payload,
        editingRowState: state.allRows.find((pr) => pr.id === action.payload),
      };
    case CANCEL_EDIT_PRICE_RULE:
      if (action.payload === 0) {
        return {
          ...state,
          editingRowId: null,
          editingRowState: {},
          error: null,
          allRows: state.allRows.slice(1),
        };
      }
      return {
        ...state,
        editingRowId: null,
        editingRowState: {},
        error: null,
      };
    case UPDATE_PRICE_RULE_PROPERTY:
      const { propertyName, propertyValue } = action.payload;
      return {
        ...state,
        editingRowState: {
          ...state.editingRowState,
          [propertyName]: propertyValue,
        },
      };
    case CREATE_PRICE_RULE:
      const initialPriceRule = { ...emptyEDPriceRule, id: 0 };
      return {
        ...state,
        editingRowId: 0,
        editingRowState: initialPriceRule,
        allRows: [initialPriceRule, ...state.allRows],
      };
    case SAVE_PRICE_RULE:
      return {
        ...state,
        loading: true,
      };
    case SAVE_PRICE_RULE_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
      };
    case SAVE_PRICE_RULE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_PRICE_RULE:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRICE_RULE_SUCCESS:
      const { payload } = action;
      if (payload && typeof payload !== 'object')
        return { ...state, loading: false, error: null };
      return {
        ...state,
        loading: false,
        editingRowId: null,
        editingRowState: {},
        error: null,
        allRows: state.allRows.some((pr) => payload.id === pr.id)
          ? state.allRows.map((pr) => (pr.id === payload.id ? payload : pr))
          : [...state.allRows.slice(1), payload],
      };
    case FETCH_PRICE_RULE_ERROR:
      return {
        ...state,
        loading: false,
        editingRowId: null,
        editingRowState: {},
        error: action.payload,
      };
    case DELETE_PRICE_RULE:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PRICE_RULE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case DELETE_PRICE_RULE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET_PRICE_RULES:
      return initialState;
    default:
      return state;
  }
};

const selectAllPriceRuleRows = (store: Store) => store.priceRule.allRows;
const selectEditingPriceRule = (store: Store) =>
  store.priceRule.editingRowState;
const selectIsEditingPriceRule = (store: Store) =>
  store.priceRule.editingRowId !== null;
const selectIsLoading = (store: Store) => store.priceRule.loading;
const selectBuyerTypesInActivePriceRules = (store: Store): any[] =>
  store.priceRule.allRows
    .reduce(
      (acc, priceRule) =>
        priceRule.isActive ? acc.concat(priceRule.externalBuyerTypeIds) : acc,
      []
    )
    .filter((id: string, index, arr) => arr.indexOf(id) === index);

export const selectors = {
  selectAllPriceRuleRows,
  selectEditingPriceRule,
  selectIsEditingPriceRule,
  selectBuyerTypesInActivePriceRules,
  selectIsLoading,
};
