import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as authActions } from './state/auth';
import { User as UserModel } from './_models';

import CreateUser from './scenes/CreateUser';
import Dashboard from './scenes/Dashboard';
import Login from './scenes/Login';
import Settings from './scenes/Settings';

import { history } from './_helpers';
import { AlertProvider } from './_components';
import { secured, unsecured } from './_hoc/secured';

class App extends React.Component {
  componentDidMount() {
    this.props.authActions.fetch();
  }

  render() {
    const { authState } = this.props;

    if (authState.loading) {
      return <div>Loading User Info...</div>;
    }

    return (
      <AlertProvider>
        <Router history={history}>
          <Switch>
            <Route path="/login" component={unsecured(Login)} />
            <Route path="/users/create" component={secured(CreateUser)} />
            <Route path="/settings" component={secured(Settings)} />
            <Route path="/" component={secured(Dashboard)} />
          </Switch>
        </Router>
      </AlertProvider>
    );
  }
}

App.propTypes = {
  authActions: PropTypes.shape({
    fetch: PropTypes.func.isRequired
  }),

  authState: PropTypes.shape({
    model: UserModel, // eslint-disable-line
    loading: PropTypes.bool.isRequired // eslint-disable-line
  })
};

function mapStateToProps(state) {
  return {
    authState: state.auth
  };
}

function mapActionCreators(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapActionCreators)(App);
