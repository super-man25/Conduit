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
  UPDATE_INTEGRATION,
  RESET_DIRTY_PRICING_INTERVAL,
  SET_PRICING_INTERVAL
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
    +logoUrl: string
  }>
};

export const initialState: State = {
  loading: false,
  integrations: []
};

export default function clientReducer(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case FETCH_ASYNC:
      return {
        ...state,
        loading: true
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        dirtyPricingInterval: action.payload.pricingInterval
      };
    case FETCH_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case UPDATE_ASYNC:
      return {
        ...state,
        loading: true
      };
    case SET_PRICING_INTERVAL:
      return {
        ...state,
        dirtyPricingInterval: action.payload
      };
    case RESET_DIRTY_PRICING_INTERVAL:
      return {
        ...state,
        dirtyPricingInterval: state.pricingInterval
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        dirtyPricingInterval: action.payload.pricingInterval
      };
    case UPDATE_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case FETCH_INTEGRATIONS_ASYNC:
      return {
        ...state,
        loading: action.payload
      };
    case FETCH_INTEGRATIONS_SUCCESS:
      return {
        ...state,
        integrations: action.payload
      };
    case FETCH_INTEGRATIONS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case UPDATE_INTEGRATION:
      const { id, isActive, modifiedAt } = action.payload;
      return {
        ...state,
        integrations: state.integrations.map((integration) => {
          if (integration.id === id) {
            return { ...integration, isActive, modifiedAt };
          }

          return integration;
        })
      };
    default:
      return state;
  }
}