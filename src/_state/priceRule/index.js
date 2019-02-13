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
const SAVE_EDITED_PRICE_RULE = 'priceRule/SAVE_EDITED_PRICE_RULE';
const UPDATE_PRICE_RULE_PROPERTY = 'priceRule/UPDATE_PRICE_RULE_PROPERTY';
const CREATE_PRICE_RULE = 'priceRule/CREATE_PRICE_RULE';

// Action types
export type FetchPriceRulesAction = {
  type: 'priceRule/FETCH_PRICE_RULES',
  payload: null
};

export type FetchPriceRulesSuccessAction = {
  type: 'priceRule/FETCH_PRICE_RULES_SUCCESS',
  payload: EDPriceRule[]
};

export type FetchPriceRulesErrorAction = {
  type: 'priceRule/FETCH_PRICE_RULES_ERROR',
  payload: Error
};

export type StartEditingPriceRuleAction = {
  type: 'priceRule/START_EDIT_PRICE_RULE',
  payload: number
};

export type CancelEditingPriceRuleAction = {
  type: 'priceRule/CANCEL_EDIT_PRICE_RULE',
  payload: number
};

export type SaveEditedPriceRuleAction = {
  type: 'priceRule/SAVE_EDITED_PRICE_RULE',
  payload: number
};

export type ResetPriceRulesAction = {
  type: 'priceRule/RESET_PRICE_RULES',
  payload: null
};

export type UpdatePriceRulePropertyAction = {
  type: 'priceRule/UPDATE_PRICE_RULE_PROPERTY',
  payload: any
};

export type CreatePriceRuleAction = {
  type: 'priceRule/CREATE_PRICE_RULE',
  payload: null
};

export type Action =
  | FetchPriceRulesAction
  | FetchPriceRulesSuccessAction
  | FetchPriceRulesErrorAction
  | StartEditingPriceRuleAction
  | CancelEditingPriceRuleAction
  | ResetPriceRulesAction
  | UpdatePriceRulePropertyAction
  | CreatePriceRuleAction;

export const types = {
  FETCH_PRICE_RULES,
  FETCH_PRICE_RULES_SUCCESS,
  FETCH_PRICE_RULES_ERROR,
  RESET_PRICE_RULES,
  START_EDIT_PRICE_RULE,
  CANCEL_EDIT_PRICE_RULE,
  SAVE_EDITED_PRICE_RULE,
  UPDATE_PRICE_RULE_PROPERTY,
  CREATE_PRICE_RULE
};

// Actions
const fetchPriceRules = (): FetchPriceRulesAction => ({
  type: FETCH_PRICE_RULES,
  payload: null
});

const startEditingPriceRule = (id: number): StartEditingPriceRuleAction => {
  return {
    type: START_EDIT_PRICE_RULE,
    payload: id
  };
};

const cancelEditingPriceRule = (id: number): CancelEditingPriceRuleAction => {
  return {
    type: CANCEL_EDIT_PRICE_RULE,
    payload: id
  };
};

const saveEditedPriceRule = (id: number): SaveEditedPriceRuleAction => {
  return {
    type: SAVE_EDITED_PRICE_RULE,
    payload: id
  };
};

const updatePriceRuleProperty = (
  payload: any
): UpdatePriceRulePropertyAction => {
  return {
    type: UPDATE_PRICE_RULE_PROPERTY,
    payload
  };
};

const createPriceRule = (): CreatePriceRuleAction => {
  return {
    type: CREATE_PRICE_RULE,
    payload: null
  };
};

const resetPriceRules = (): ResetPriceRulesAction => ({
  type: RESET_PRICE_RULES,
  payload: null
});

export const actions = {
  fetchPriceRules,
  startEditingPriceRule,
  cancelEditingPriceRule,
  saveEditedPriceRule,
  resetPriceRules,
  updatePriceRuleProperty,
  createPriceRule
};

// State/Reducer
type State = {
  allRows: EDPriceRule[],
  loading: boolean,
  editingRowId: number | null,
  editingRowState: ?any,
  error: ?Error
};

export const initialState: State = {
  allRows: [],
  loading: false,
  editingRowId: null,
  editingRowState: {},
  error: null
};

type Store = {
  priceRule: State
};

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case FETCH_PRICE_RULES:
      return {
        ...state,
        loading: true
      };
    case FETCH_PRICE_RULES_SUCCESS:
      return {
        ...state,
        loading: false,
        allRows: action.payload
      };
    case FETCH_PRICE_RULES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case START_EDIT_PRICE_RULE:
      return {
        ...state,
        editingRowId: action.payload,
        editingRowState: state.allRows.find((pr) => pr.id === action.payload)
      };
    case CANCEL_EDIT_PRICE_RULE:
      if (action.payload === 0) {
        return {
          ...state,
          editingRowId: null,
          editingRowState: {},
          allRows: state.allRows.slice(0, -1)
        };
      }
      return {
        ...state,
        editingRowId: null,
        editingRowState: {}
      };
    case UPDATE_PRICE_RULE_PROPERTY:
      const { propertyName, propertyValue } = action.payload;
      return {
        ...state,
        editingRowState: {
          ...state.editingRowState,
          [propertyName]: propertyValue
        }
      };
    case CREATE_PRICE_RULE:
      const initialPriceRule = { ...emptyEDPriceRule, id: 0 };
      return {
        ...state,
        editingRowId: 0,
        editingRowState: initialPriceRule,
        allRows: [...state.allRows, initialPriceRule]
      };
    case RESET_PRICE_RULES:
      return initialState;
    default:
      return state;
  }
};

const selectAllPriceRuleRows = (store: Store) => store.priceRule.allRows;

export const selectors = {
  selectAllPriceRuleRows
};
