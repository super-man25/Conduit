import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';


function login(email, password) {
  function request(user) { return { type: userConstants.LOGIN_REQUEST, user }; }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }; }
  console.log(`~~~~~ login action, email = ${ email } ~~~~~`);
  return (dispatch) => {
    dispatch(request({ email })); // dispatches request(user) ?

    userService.login(email, password)
      .then(
        (user) => {
          dispatch(success(user)); // login success dispatches success(user)
          history.push('/dashboard');
        },
        (error) => {
          dispatch(failure(error)); // login success dispatches failure(error)
          dispatch(alertActions.error(error)); // login failure also dispatches alertActions.error(error)
        }
      );
  };


}

function logout() {
  console.log('~~~~~ logout action ~~~~~');
  userService.logout();
  history.push('/login');
  return { type: userConstants.LOGOUT };
}

function register(user) {
  function request(userObj) { return { type: userConstants.REGISTER_REQUEST, userObj }; }
  function success(userObj) { return { type: userConstants.REGISTER_SUCCESS, userObj }; }
  function failure(error) { return { type: userConstants.REGISTER_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request(user));

    userService.register(user)
      .then(
        () => {
          dispatch(success());
          history.push('/login');
          dispatch(alertActions.success('Registration successful'));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };
}

function getAll() {
  function request() { return { type: userConstants.GETALL_REQUEST }; }
  function success(users) { return { type: userConstants.GETALL_SUCCESS, users }; }
  function failure(error) { return { type: userConstants.GETALL_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    userService.getAll()
      .then(
        (users) => dispatch(success(users)),
        (error) => dispatch(failure(error))
      );
  };
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  function request(userId) { return { type: userConstants.DELETE_REQUEST, userId }; }
  function success(userId) { return { type: userConstants.DELETE_SUCCESS, userId }; }
  function failure(userId, error) { return { type: userConstants.DELETE_FAILURE, userId, error }; }
  return (dispatch) => {
    dispatch(request(id));

    userService.delete(id)
      .then(
        () => {
          dispatch(success(id));
        },
        (error) => {
          dispatch(failure(id, error));
        }
      );
  };
}

export const userActions = {
  login,
  logout,
  register,
  getAll,
  delete: _delete
};
