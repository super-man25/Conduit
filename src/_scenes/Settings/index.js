// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  ApiAlert,
  EDLink,
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
import TeamSettings from './TeamSettings';
import UserSettings from './UserSettings';
import type { Node } from 'react';
import type { EDUser } from '_models/user';
import { admin } from '_hoc/secured';

type RouteConfig = {
  path: string,
  main: (...args: any) => Node
};

const routes: Array<RouteConfig> = [
  {
    path: '/settings/team',
    main: TeamSettings
  },
  {
    path: '/settings/user',
    main: UserSettings
  },
  {
    path: '/settings/create-user',
    main: admin(CreateUser)
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
      <ApiAlert />
      <LeftNav>
        <Spacing padding="2rem">
          <Flex direction="column" align-items="center">
            <Spacing padding="2rem 0">
              <EDNavLink
                weight="light"
                to="/settings/team"
                activeStyle={{
                  color: cssConstants.PRIMARY_LIGHT_BLUE,
                  textShadow: `0 0 .1px ${cssConstants.PRIMARY_LIGHT_BLUE}`
                }}
              >
                Team Settings
              </EDNavLink>
            </Spacing>
            <Spacing padding="2rem 0">
              <EDNavLink
                weight="light"
                to="/settings/user"
                activeStyle={{
                  color: cssConstants.PRIMARY_LIGHT_BLUE,
                  textShadow: `0 0 .1px ${cssConstants.PRIMARY_LIGHT_BLUE}`
                }}
                data-test-id="user-settings-button"
              >
                User Settings
              </EDNavLink>
            </Spacing>
            {authState.model.isAdmin && (
              <Spacing padding="2rem 0">
                <EDLink weight="light" to="/settings/create-user">
                  Create User
                </EDLink>
              </Spacing>
            )}
          </Flex>
        </Spacing>
      </LeftNav>
      <PrimaryContent>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} component={route.main} />
        ))}
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
  connect(mapStateToProps, mapDispatchToProps)(Settings)
);
