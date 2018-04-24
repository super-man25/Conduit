import { clientService } from '../../_services';
import { success as alertSuccess, error as alertError } from '../alert/actions.js';

export const GET_REQUEST = 'clients/GET_REQUEST';
export const GET_SUCCESS = 'clients/GET_SUCCESS';
export const GET_FAILURE = 'clients/GET_FAILURE';
export const UPDATE_REQUEST = 'clients/UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'clients/UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'clients/UPDATE_FAILURE';

function getClient() {
  function request() { return { type: GET_REQUEST }; }
  function success(client) { return { type: GET_SUCCESS, client }; }
  function failure(error) { return { type: GET_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request()); // dispatch function that will dispatch the action that will update the local state

    return clientService.getClient() // use the clientService to hit the API and get the client object
      .then(
        (fetchedClient) => {
          dispatch(success(fetchedClient));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertError(error)); // get failure also dispatches alertError(error)
        }
      );
  };
}

function updateClient(attribute, value) {
  function request(client) { return { type: UPDATE_REQUEST, client }; }
  function success(client) { return { type: UPDATE_SUCCESS, client }; }
  function failure(error) { return { type: UPDATE_FAILURE, error }; }
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
          dispatch(alertSuccess('Client successfully updated')); // update success also dispatches alertSuccess()
        },
        (error) => {
          dispatch(failure(error)); // update failure dispatches failure(error)
          dispatch(alertError(error)); // update failure also dispatches alertError(error)
        }
      );
  };
}

export default {
  getClient,
  updateClient
};
