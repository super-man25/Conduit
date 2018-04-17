import { clientConstants } from '../_constants';
import { clientService } from '../_services';
import { alertActions } from './';

function getSettings() {
  function request() { return { type: clientConstants.GET_SETTINGS_REQUEST }; }
  function success(settings) { return { type: clientConstants.GET_SETTINGS_SUCCESS, settings }; }
  function failure(error) { return { type: clientConstants.GET_SETTINGS_FAILURE, error }; }
  console.log(`~~~~~ getSettings action ~~~~~`);
  return (dispatch) => {
    dispatch(request());

    clientService.getSettings()
      .then(
        (settings) => dispatch(success(settings)),
        (error) => dispatch(failure(error))
      );
  };
}

function updateSettings(attribute, value) {
  function request(updateObj) { return { type: clientConstants.UPDATE_SETTINGS_REQUEST, updateObj }; }
  function success(settings) { return { type: clientConstants.UPDATE_SETTINGS_SUCCESS, settings }; }
  function failure(error) { return { type: clientConstants.UPDATE_SETTINGS_FAILURE, error }; }
  console.log(`~~~~~ updateSettings action, attribute = ${ attribute }, value = ${ value } ~~~~~`);
  return (dispatch) => {
    dispatch(request({ attribute, value })); // dispatches request(updateObj) ?

    clientService.updateSettings(attribute, value) // service should return updated settings if update works
      .then(
        (settings) => {
          dispatch(success(settings)); // update success dispatches success(client)
          dispatch(alertActions.success()); // update success also dispatches alertActions.success()
        },
        (error) => {
          dispatch(failure(error)); // update failure dispatches failure(error)
          dispatch(alertActions.error(error)); // update failure also dispatches alertActions.error(error)
        }
      );
  };
}

export const clientActions = {
  getSettings,
  updateSettings
};
