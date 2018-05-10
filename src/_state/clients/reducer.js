import {
  GET_REQUEST,
  GET_SUCCESS,
  GET_FAILURE,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAILURE
} from './actions';

const initialState = {
  loading: false
};

// note that due to reducer composition, the state referred to here is
// the 'state' of the 'client' attribute of the Redux store
export default function clientReducer(state = initialState, action) {
  // console.log('~~~~~ client reducer, action.type is ~~~~~', action.type);
  switch (action.type) {
    case GET_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_SUCCESS:
      return {
        // api serializer to remove createdAt, modifiedAt ?
        ...state,
        loading: false,
        id: action.payload.id,
        name: action.payload.name,
        pricingInterval: action.payload.pricingInterval
      };
    case GET_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case UPDATE_REQUEST:
      return {
        ...state,
        updating: true
      };
    case UPDATE_SUCCESS:
      return {
        // api serializer to remove createdAt, modifiedAt ?
        updating: false,
        id: action.payload.id,
        name: action.payload.name,
        pricingInterval: action.payload.pricingInterval
      };
    case UPDATE_FAILURE:
      const updateErrorClient = { ...state, updateError: action.error };
      delete updateErrorClient.updating;
      return {
        client: updateErrorClient
      };
    default:
      return state;
  }
}
