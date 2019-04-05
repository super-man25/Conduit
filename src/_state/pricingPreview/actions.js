// Action Types
export const FETCH = 'pricingPreview/FETCH';
export const PARAMS_CHANGED = 'pricingPreview/PARAMS_CHANGED';
export const FETCH_ASYNC = 'pricingPreview/FETCH_ASYNC';
export const FETCH_SUCCESS = 'pricingPreview/FETCH_SUCCESS';
export const FETCH_ERROR = 'pricingPreview/FETCH_ERROR';
export const RESET = 'pricingPreview/RESET';

// Action Generators
export function fetch(eventId, eventScore, spring) {
  return {
    type: FETCH,
    payload: {
      eventId,
      eventScore,
      spring
    }
  };
}

export function paramsChanged(eventId, eventScore, spring) {
  return {
    type: PARAMS_CHANGED,
    payload: {
      eventId,
      eventScore,
      spring
    }
  };
}
