import {
  GET_REQUEST,
  GET_SUCCESS,
  GET_FAILURE,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAILURE
} from './actions';

const initialState = {
  loading: false,
  model: null
};

// note that due to reducer composition, the state referred to here is
// the 'state' of the 'client' attribute of the Redux store
export default function clientsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REQUEST:
      return {
        loading: true
      };
    case GET_SUCCESS:
      return { // api serializer to remove createdAt, modifiedAt ?
        id: action.client.id,
        name: action.client.name,
        pricingInterval: action.client.pricingInterval
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
      return action.client;
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
