import { clientConstants } from '../_constants';
import { clientService } from '../_services';
import { alertActions } from './';

function getClient() {
  function request() { return { type: clientConstants.GET_REQUEST }; }
  function success(client) { return { type: clientConstants.GET_SUCCESS, client }; }
  function failure(error) { return { type: clientConstants.GET_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request()); // dispatch function that will dispatch the action that will update the local state

    return clientService.getClient() // use the clientService to hit the API and get the client object
      .then(
        (fetchedClient) => {
          dispatch(success(fetchedClient));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error)); // get failure also dispatches alertActions.error(error)
        }
      );
  };
}

function updateClient(attribute, value) {
  function request(client) { return { type: clientConstants.UPDATE_REQUEST, client }; }
  function success(client) { return { type: clientConstants.UPDATE_SUCCESS, client }; }
  function failure(error) { return { type: clientConstants.UPDATE_FAILURE, error }; }
  return (dispatch, getState) => {
    // here we need to make an 'update' client from attribute, value and the current state.client
    const currentClient = getState().client;
    const proposedClient = {
      ...currentClient,
      [attribute]: attribute !== 'name' ? parseInt(value, 10) : value
    };
    dispatch(request(proposedClient)); // dispatches request(client) ?

    return clientService.updateClient(proposedClient) // api returns updated client if update works
      .then(
        (updatedClient) => {
          // console.log('updatedClient returned by API: ', updatedClient);
          dispatch(success(updatedClient)); // update success dispatches success(updatedClient)
          dispatch(alertActions.success('Client successfully updated')); // update success also dispatches alertActions.success()
        },
        (error) => {
          dispatch(failure(error)); // update failure dispatches failure(error)
          dispatch(alertActions.error(error)); // update failure also dispatches alertActions.error(error)
        }
      );
  };
}

export const clientActions = {
  getClient,
  updateClient
};
