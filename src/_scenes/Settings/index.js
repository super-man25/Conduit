// @flow
import React from 'react';
import type { ElementType } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import {
  Flex,
  LeftNav,
  PrimaryContent,
  Spacing,
  DualContent,
  Layout,
} from '_components';
import { colors } from '_constants';
import { actions as authActions } from '_state/auth';
import CreateUser from './CreateUser';
import TeamSettings from './TeamSettings';
import UserSettings from './UserSettings';
import Onboard from './Onboard';
import type { EDUser } from '_models/user';
import { SecuredRoute } from '_components';
import { Users } from './Users';

const SidebarLink = styled(NavLink)`
  text-decoration: none;
  font-size: 16px;
  color: ${colors.gray};
  font-weight: normal;
  transition: all 0.1s ease-in-out;

  &:focus,
  &:hover {
    text-decoration: none;
    cursor: pointer;
    color: ${colors.blue};
    text-shadow: 0 0 0.5px ${colors.blue};
  }

  &:active,
  &:visited {
    text-decoration: none;
  }
`;

type RouteConfig = {
  path: string,
  linkText: string,
  adminOnly: boolean,
  main: ElementType,
};

const routes: Array<RouteConfig> = [
  {
    path: '/settings/team',
    linkText: 'Team Settings',
    adminOnly: false,
    main: TeamSettings,
  },
  {
    path: '/settings/user',
    linkText: 'User Settings',
    adminOnly: false,
    main: UserSettings,
  },
  {
    path: '/settings/users',
    linkText: 'View Users',
    adminOnly: false,
    main: Users,
  },
  {
    path: '/settings/create-user',
    linkText: 'Create User',
    adminOnly: true,
    main: CreateUser,
  },
  {
    path: '/settings/onboard',
    linkText: 'Onboard',
    adminOnly: true,
    main: Onboard,
  },
];

type Props = {
  authActions: {
    signOut: () => void,
  },
  authState: {
    model: EDUser,
  },
};

export const Settings = ({ authState, authActions }: Props) => (
  <Layout>
    <DualContent>
      <LeftNav>
        <Spacing padding="2rem">
          <Flex direction="column" align-items="center">
            {routes
              .filter((route) => !route.adminOnly || authState.model.isAdmin)
              .map((route) => (
                <Spacing padding="2rem 0" key={route.path}>
                  <SidebarLink
                    size="large"
                    weight="heavy"
                    to={route.path}
                    activeStyle={{
                      color: colors.blue,
                      textShadow: `0 0 0.5px ${colors.blue}`,
                    }}
                  >
                    {route.linkText}
                  </SidebarLink>
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
    </DualContent>
  </Layout>
);

function mapStateToProps(state) {
  return {
    authState: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Settings)
);
