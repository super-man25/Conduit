// Constants
export const ONBOARD_CLIENT_ASYNC = 'onboard/ONBOARD_CLIENT';
export const ONBOARD_CLIENT_SUCCESS = 'onboard/ONBOARD_CLIENT_SUCCESS';
export const ONBOARD_CLIENT_ERROR = 'onboard/ONBOARD_CLIENT_ERROR';

// Action Creators
function onboardClient(data) {
  return {
    type: ONBOARD_CLIENT_ASYNC,
    payload: data
  };
}

export default {
  onboardClient
};
