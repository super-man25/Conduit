import { SUCCESS, ERROR, CLEAR } from './actions';

const initialState = {
  type: null,
  message: null,
};

export default function alertReducer(state = initialState, action) {
  switch (action.type) {
    case SUCCESS:
      return {
        type: 'apiSuccess',
        message: action.payload,
      };
    case ERROR:
      return {
        type: 'apiError',
        message: action.payload,
      };
    case CLEAR:
      return initialState;
    default:
      return state;
  }
}
