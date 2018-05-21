import { AlertProvider } from '_components';
import { history } from '_helpers';
import { secured, unsecured } from '_hoc/secured';
import { User as UserModel } from '_models';
import CreateUser from '_scenes/CreateUser';
import Dashboard from '_scenes/Dashboard';
import Login from '_scenes/Login';
import Settings from '_scenes/Settings';
import { actions as authActions } from '_state/auth';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';

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
    model: UserModel,
    loading: PropTypes.bool.isRequired
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
