// @flow

import { CenteredLoader } from '_components';
import { history } from '_helpers';
import { secured, unsecured } from '_hoc/secured';
import { actions as authActions } from '_state/auth';
import React from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { ConnectedRouter } from 'connected-react-router';
import type { EDUser } from '_models';

const Dashboard = Loadable({
  loader: () => import('_scenes/Dashboard'),
  loading: CenteredLoader
});

const Login = Loadable({
  loader: () => import('_scenes/Login'),
  loading: CenteredLoader
});

const Settings = Loadable({
  loader: () => import('_scenes/Settings'),
  loading: CenteredLoader
});

type Props = {
  authActions: {
    fetch: () => void
  },
  authState: {
    loading: boolean,
    model: EDUser
  }
};

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.authActions.fetch();
  }

  render() {
    const {
      authState: { loading }
    } = this.props;

    return loading ? (
      <CenteredLoader />
    ) : (
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/login" component={unsecured(Login)} />
          <Route path="/settings" component={secured(Settings)} />
          <Route path="/" component={secured(Dashboard)} />
        </Switch>
      </ConnectedRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    authState: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
