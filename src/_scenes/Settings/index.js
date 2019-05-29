// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  EDNavLink,
  Flex,
  FullContent,
  LeftNav,
  PageWrapper,
  PrimaryContent,
  SiteHeader,
  Spacing
} from '_components';
import { cssConstants } from '_constants';
import { actions as authActions } from '_state/auth';
import CreateUser from './CreateUser';
import Demo from './Demo';
import TeamSettings from './TeamSettings';
import UserSettings from './UserSettings';
import type { Node } from 'react';
import type { EDUser } from '_models/user';
import { SecuredRoute } from '_components';
import { Users } from './Users';

type RouteConfig = {
  path: string,
  linkText: string,
  adminOnly: boolean,
  main: (...args: any) => Node
};

const routes: Array<RouteConfig> = [
  {
    path: '/settings/team',
    linkText: 'Team Settings',
    adminOnly: false,
    main: TeamSettings
  },
  {
    path: '/settings/user',
    linkText: 'User Settings',
    adminOnly: false,
    main: UserSettings
  },
  {
    path: '/settings/users',
    linkText: 'View Users',
    adminOnly: false,
    main: Users
  },
  {
    path: '/settings/create-user',
    linkText: 'Create User',
    adminOnly: true,
    main: CreateUser
  },
  {
    path: '/settings/demo',
    linkText: 'Demo',
    adminOnly: true,
    main: Demo
  }
];

type Props = {
  authActions: {
    signOut: () => void
  },
  authState: {
    model: EDUser
  }
};

export const Settings = ({ authState, authActions }: Props) => (
  <PageWrapper>
    <SiteHeader auth={authState.model} authActions={authActions} />
    <FullContent>
      <LeftNav>
        <Spacing padding="2rem">
          <Flex direction="column" align-items="center">
            {routes
              .filter((r) => !r.adminOnly || authState.model.isAdmin)
              .map((r) => (
                <Spacing padding="2rem 0" key={r.path}>
                  <EDNavLink
                    weight="light"
                    to={r.path}
                    activeStyle={{
                      color: cssConstants.PRIMARY_BLUE,
                      textShadow: `0 0 0.5px ${cssConstants.PRIMARY_BLUE}`
                    }}
                  >
                    {r.linkText}
                  </EDNavLink>
                </Spacing>
              ))}
          </Flex>
        </Spacing>
      </LeftNav>
      <PrimaryContent>
        {routes.map((route, index) =>
          route.adminOnly ? (
            <SecuredRoute
              key={index}
              path={route.path}
              authorized={!!authState.model && authState.model.isAdmin}
              component={route.main}
            />
          ) : (
            <Route key={index} path={route.path} component={route.main} />
          )
        )}
      </PrimaryContent>
    </FullContent>
  </PageWrapper>
);

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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Settings)
);
