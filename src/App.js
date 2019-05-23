// @flow

import { CenteredLoader, ApiAlert } from '_components';
import { history } from '_helpers';
import { actions as authActions, selectors } from '_state/auth';
import React from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';
import { SecuredRoute } from '_components';
import type { EDUser } from '_models/user';

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

const PricingRules = Loadable({
  loader: () => import('_scenes/PricingRules'),
  loading: CenteredLoader
});

type Props = {
  fetchUser: () => void,
  fetchIntegrations: () => void,
  loading: boolean,
  user: ?EDUser
};

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { loading, user } = this.props;
    const isAuthorized = !!user;

    return loading ? (
      <CenteredLoader />
    ) : (
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <SecuredRoute
            authorized={isAuthorized}
            path="/settings"
            component={Settings}
          />
          <SecuredRoute
            authorized={isAuthorized}
            path="/pricing"
            component={PricingRules}
          />
          <SecuredRoute
            authorized={isAuthorized}
            path="/"
            component={Dashboard}
          />
        </Switch>
        <ApiAlert />
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading: selectors.selectLoading,
  user: selectors.selectUser
});

const mapDispatchToProps = {
  fetchUser: authActions.fetch
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
