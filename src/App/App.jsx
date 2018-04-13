import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { LoginPage } from '../LoginPage';
import { DashboardPage } from '../DashboardPage';
import { SettingsPage } from '../SettingsPage';
import { CreateUserPage } from '../CreateUserPage';

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen(() => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    const RedirectToDashboard = () => <Redirect to="/dashboard" />;

    return (
      <div>
        {alert.message &&
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        }
        <Router history={history}>
          <div>
            <Route exact path="/" component={RedirectToDashboard} />
            <Route exact path="/login" component={localStorage.getItem('user') ? RedirectToDashboard : LoginPage} />
            <Route exact path="/logout" component={LoginPage} />
            <PrivateRoute exact path="/dashboard" component={DashboardPage} />
            <PrivateRoute exact path="/dashboard/settings" component={SettingsPage} />
            <PrivateRoute exact path="/dashboard/users/create" component={CreateUserPage} />
          </div>
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  alert: PropTypes.objectOf(PropTypes.any),
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
