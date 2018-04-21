import { clientConstants } from '../_constants';

export function client(state = {}, action) {
  switch (action.type) {
    case clientConstants.GET_REQUEST:
      return {
        loading: true
      };
    case clientConstants.GET_SUCCESS:
      return {
        client: action.client
      };
    case clientConstants.GET_FAILURE:
      return {
        error: action.error
      };
    case clientConstants.UPDATE_REQUEST:
      return {
        client: { ...state.client, updating: true }
      };
    case clientConstants.UPDATE_SUCCESS:
      return {
        client: action.client
      };
    case clientConstants.UPDATE_FAILURE:
      const updatedClient = { ...state.client, updateError: action.error };
      delete updatedClient.updating;
      return {
        client: updatedClient
      };
    default:
      return state;
  }
}
