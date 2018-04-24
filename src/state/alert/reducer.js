import {
  SUCCESS,
  ERROR,
  CLEAR
} from './actions';

const initialState = {
  show: false,
  type: null,
  message: null
};

export default function alertReducer(state = initialState, action) {
  switch (action.type) {
    case (SUCCESS):
      return {
        show: true,
        type: 'alert-success',
        message: action.payload
      };
    case (ERROR):
      return {
        show: true,
        type: 'alert-danger',
        message: action.payload
      };
    case (CLEAR):
      return initialState;
    default:
      return state;
  }
}

