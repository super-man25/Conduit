import { clientConstants } from '../_constants';

export function client(state = {}, action) {
  switch (action.type) {
    case clientConstants.GET_SETTINGS_REQUEST:
      return {
        loading: true
      };
    case clientConstants.GET_SETTINGS_SUCCESS:
      return {
        clientSettings: action.settings // action data is clientSettings
      };
    case clientConstants.GET_SETTINGS_FAILURE:
      return {
        error: action.error
      };
    case clientConstants.UPDATE_SETTINGS_REQUEST:
      // add 'updating:true' property to client settings
      return {
        ...state,
        items: state.items.map((user) => {
          return user.id === action.id ? { ...user, deleting: true } : user;
        })
      };
    case clientConstants.UPDATE_SETTINGS_SUCCESS:
      // update clientSettings in state
      return {
        clientSettings: action.settings
      };
    case clientConstants.UPDATE_SETTINGS_FAILURE:
      // remove 'updating:true' property and add 'updateError:[error]' property to clientSettings
      return {
        ...state,
        items: state.items.map((user) => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            let { ...userCopy } = user;
            delete userCopy.deleting; 
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }
          return user;
        })
      };
    default:
      return state;
  }
}
