import { clientConstants } from '../_constants';
// note that due to reducer composition, the state referred to here is
// the 'state' of the 'client' attribute of the Redux store
export function client(state = {}, action) {
  switch (action.type) {
    case clientConstants.GET_REQUEST:
      return {
        loading: true
      };
    case clientConstants.GET_SUCCESS:
      return { // api serializer to remove createdAt, modifiedAt ?
        id: action.client.id,
        name: action.client.name,
        pricingInterval: action.client.pricingInterval
      };
    case clientConstants.GET_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case clientConstants.UPDATE_REQUEST:
      return {
        ...state,
        updating: true
      };
    case clientConstants.UPDATE_SUCCESS:
      return action.client;
    case clientConstants.UPDATE_FAILURE:
      const updateErrorClient = { ...state, updateError: action.error };
      delete updateErrorClient.updating;
      return {
        client: updateErrorClient
      };
    default:
      return state;
  }
}
