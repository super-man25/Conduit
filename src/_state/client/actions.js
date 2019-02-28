// @flow

import type { EDClient, EDIntegration } from '_models';

// Constants
export const FETCH_ASYNC = 'client/FETCH_ASYNC';
export const FETCH_SUCCESS = 'client/FETCH_SUCCESS';
export const FETCH_ERROR = 'client/FETCH_ERROR';
export const UPDATE_ASYNC = 'client/UPDATE_ASYNC';
export const UPDATE_SUCCESS = 'client/UPDATE_SUCCESS';
export const UPDATE_ERROR = 'client/UPDATE_ERROR';
export const FETCH_INTEGRATIONS_ASYNC = 'client/FETCH_INTEGRATIONS_ASYNC';
export const FETCH_INTEGRATIONS_SUCCESS = 'client/FETCH_INTEGRATIONS_SUCCESS';
export const FETCH_INTEGRATIONS_ERROR = 'client/FETCH_INTEGRATIONS_ERROR';
export const TOGGLE_INTEGRATION = 'client/TOGGLE_INTEGRATION';
export const UPDATE_INTEGRATION = 'client/UPDATE_INTEGRATION';
export const SET_PRICING_INTERVAL = 'client/SET_PRICING_INTERVAL';
export const RESET_DIRTY_PRICING_INTERVAL =
  'client/RESET_DIRTY_PRICING_INTERVAL';

export type Action =
  | { type: typeof FETCH_ASYNC, payload: boolean }
  | { type: typeof FETCH_ERROR, payload?: Error }
  | { type: typeof SET_PRICING_INTERVAL, payload: number }
  | { type: typeof RESET_DIRTY_PRICING_INTERVAL, payload: number }
  | { type: typeof FETCH_SUCCESS, payload: EDClient }
  | { type: typeof UPDATE_ASYNC, payload: { pricingInterval: number } }
  | { type: typeof UPDATE_SUCCESS, payload: EDClient }
  | { type: typeof UPDATE_ERROR, payload?: Error }
  | { type: typeof FETCH_INTEGRATIONS_ASYNC, payload: boolean }
  | { type: typeof FETCH_INTEGRATIONS_SUCCESS, payload: Array<EDIntegration> }
  | { type: typeof FETCH_INTEGRATIONS_ERROR, payload?: Error }
  | {
      type: typeof TOGGLE_INTEGRATION,
      payload: { id: number, isActive: boolean }
    }
  | {
      type: typeof UPDATE_INTEGRATION,
      payload: { id: number, isActive: boolean, modifiedAt: Date }
    };

// Action creators
function fetch(): Action {
  return {
    type: FETCH_ASYNC
  };
}

function update(payload: {}): Action {
  return {
    type: UPDATE_ASYNC,
    payload
  };
}

function fetchIntegrations(): Action {
  return {
    type: FETCH_INTEGRATIONS_ASYNC,
    payload: true
  };
}

function toggleIntegration(payload: { id: number, isActive: boolean }): Action {
  return {
    type: TOGGLE_INTEGRATION,
    payload
  };
}

function setPricingInterval(pricingInterval: number): Action {
  return {
    type: SET_PRICING_INTERVAL,
    payload: pricingInterval
  };
}

function resetDirtyPricingInterval(): Action {
  return {
    type: RESET_DIRTY_PRICING_INTERVAL
  };
}

export default {
  fetch,
  update,
  fetchIntegrations,
  toggleIntegration,
  setPricingInterval,
  resetDirtyPricingInterval
};
