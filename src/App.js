// @flow

import { CenteredLoader } from '_components';
import { history } from '_helpers';
import { secured, unsecured } from '_hoc/secured';
import { actions as authActions, selectors } from '_state/auth';
import React from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';

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
  loading: boolean
};

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { loading } = this.props;

    return loading ? (
      <CenteredLoader />
    ) : (
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/login" component={unsecured(Login)} />
          <Route path="/settings" component={secured(Settings)} />
          <Route path="/pricing" component={secured(PricingRules)} />
          <Route path="/" component={secured(Dashboard)} />
        </Switch>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading: selectors.selectLoading
});

const mapDispatchToProps = {
  fetchUser: authActions.fetch
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
