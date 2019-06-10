// Action Types
export const FETCH = 'pricingPreview/FETCH';
export const PARAMS_CHANGED = 'pricingPreview/PARAMS_CHANGED';
export const FETCH_ASYNC = 'pricingPreview/FETCH_ASYNC';
export const FETCH_SUCCESS = 'pricingPreview/FETCH_SUCCESS';
export const FETCH_ERROR = 'pricingPreview/FETCH_ERROR';
export const RESET = 'pricingPreview/RESET';

// Action Generators
export function fetch(eventId) {
  return {
    type: FETCH,
    payload: {
      eventId
    }
  };
}

export function paramsChanged(eventId) {
  return {
    type: PARAMS_CHANGED,
    payload: {
      eventId
    }
  };
}

export default {
  fetch,
  paramsChanged
};
