import {
  ONBOARD_CLIENT_ASYNC,
  ONBOARD_CLIENT_SUCCESS,
  ONBOARD_CLIENT_ERROR,
} from './actions';

const initialState = {
  loading: false,
  saved: false,
};

export default function onboardReducer(state = initialState, action) {
  switch (action.type) {
    case ONBOARD_CLIENT_ASYNC:
      return { ...state, loading: true, saved: false };
    case ONBOARD_CLIENT_SUCCESS:
      return { ...state, loading: false, saved: true };
    case ONBOARD_CLIENT_ERROR:
      return { ...state, loading: false, saved: false };
    default:
      return state;
  }
}
