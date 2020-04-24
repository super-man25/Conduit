// @flow
import {
  FETCH_ASYNC,
  FETCH_SUCCESS,
  FETCH_ERROR,
  UPDATE_ASYNC,
  UPDATE_SUCCESS,
  UPDATE_ERROR,
  FETCH_INTEGRATIONS_ASYNC,
  FETCH_INTEGRATIONS_SUCCESS,
  FETCH_INTEGRATIONS_ERROR,
  UPDATE_SECONDARY_PRICING_RULE_ASYNC,
  UPDATE_SECONDARY_PRICING_RULE_ASYNC_SUCCESS,
  UPDATE_SECONDARY_PRICING_RULE_ASYNC_ERROR,
  RESET_DIRTY_PRICING_INTERVAL,
  SET_PRICING_INTERVAL,
  DISABLE_INTEGRATION_ASYNC,
  DISABLE_INTEGRATION_SUCCESS,
  DISABLE_INTEGRATION_ERROR,
} from './actions';
import type { Action } from './actions';

type State = {
  +loading: boolean,
  +id?: number,
  +name?: string,
  +pricingInterval?: number,
  +dirtyPricingInterval?: number,
  +error?: Error,
  integrations: Array<{
    +id: number,
    +appId: string,
    +name: string,
    +version: string,
    +createdAt: Date,
    +modifiedAt: Date,
    +isPrimary: boolean,
    +isActive: boolean,
    +logoUrl: string,
  }>,
};

export const initialState: State = {
  loading: false,
  integrations: [],
};

export default function clientReducer(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case FETCH_ASYNC:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        dirtyPricingInterval: action.payload.pricingInterval,
      };
    case FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_ASYNC:
      return {
        ...state,
        loading: true,
      };
    case SET_PRICING_INTERVAL:
      return {
        ...state,
        dirtyPricingInterval: action.payload,
      };
    case RESET_DIRTY_PRICING_INTERVAL:
      return {
        ...state,
        dirtyPricingInterval: state.pricingInterval,
      };
    case UPDATE_SUCCESS:
      return {
        ...initialState,
        ...action.payload,
        loading: false,
        dirtyPricingInterval: action.payload.pricingInterval,
      };
    case UPDATE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_SECONDARY_PRICING_RULE_ASYNC:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_SECONDARY_PRICING_RULE_ASYNC_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_SECONDARY_PRICING_RULE_ASYNC_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_INTEGRATIONS_ASYNC:
      return {
        ...state,
        loading: action.payload,
      };
    case FETCH_INTEGRATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        integrations: action.payload,
      };
    case FETCH_INTEGRATIONS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DISABLE_INTEGRATION_ASYNC:
      return {
        ...state,
        loading: true,
      };
    case DISABLE_INTEGRATION_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DISABLE_INTEGRATION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
