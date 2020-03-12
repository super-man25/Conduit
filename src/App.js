// @flow

import React from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import type { EDUser } from '_models/user';
import { history } from '_helpers';
import { actions as authActions, selectors } from '_state/auth';
import { GlobalStyles } from './globalStyles';
import { SecuredRoute, Alert, Loader } from '_components';
import { PricingRules } from '_scenes/PricingRules';
import Login from '_scenes/Login';
import Settings from '_scenes/Settings';
import Dashboard from '_scenes/Dashboard';

type Props = {
  fetchUser: () => void,
  loading: boolean,
  user: ?EDUser,
};

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchUser();
    if (process.env.REACT_APP_ENVIRONMENT === 'PROD') {
      const script = document.createElement('script');
      script.innerHTML = `
        window['_fs_debug'] = false;
        window['_fs_host'] = 'fullstory.com';
        window['_fs_script'] = 'edge.fullstory.com/s/fs.js';
        window['_fs_org'] = 'R177K';
        window['_fs_namespace'] = 'FS';
        (function(m,n,e,t,l,o,g,y){
          if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
          g=m[e]=function(a,b,s){g.q?g.q.push([a,b,s]):g._api(a,b,s);};g.q=[];
          o=n.createElement(t);o.async=1;o.crossOrigin='anonymous';o.src='https://'+_fs_script;
          y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
          g.identify=function(i,v,s){g(l,{uid:i},s);if(v)g(l,v,s)};g.setUserVars=function(v,s){g(l,v,s)};g.event=function(i,v,s){g('event',{n:i,p:v},s)};
          g.shutdown=function(){g("rec",!1)};g.restart=function(){g("rec",!0)};
          g.log = function(a,b) { g("log", [a,b]) };
          g.consent=function(a){g("consent",!arguments.length||a)};
          g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
          g.clearUserCookie=function(){};
        })(window,document,window['_fs_namespace'],'script','user');
      `;
      document.head && document.head.appendChild(script);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user === this.props.user) return;
    const { id, firstName, lastName, email, clientId } = this.props.user || {};
    window.FS &&
      window.FS.identify(id, {
        displayName: `${firstName} ${lastName}`,
        email: email,
        clientId: clientId,
      });
  }

  render() {
    const { loading, user } = this.props;
    const isAuthorized = !!user;

    return loading ? (
      <Loader centered />
    ) : (
      <ConnectedRouter history={history}>
        <GlobalStyles />
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
        <Alert />
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading: selectors.selectLoading,
  user: selectors.selectUser,
});

const mapDispatchToProps = {
  fetchUser: authActions.fetch,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
