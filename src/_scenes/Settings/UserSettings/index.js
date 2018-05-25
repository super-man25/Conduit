// @flow

import {
  Breadcrumbs,
  Flex,
  H3,
  PageWrapper,
  PrimaryContent,
  S1,
  Spacing
} from '_components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React from 'react';
import ContactInfoContainer from './containers/ContactInfoContainer';

const UserWrapper = Flex.extend`
  flex-direction: column;
  justify-content: left;
  min-width: 100%;
`;
type Props = {};

const userCrumb = [
  {
    title: 'Dashboard',
    path: '/dashboard'
  },
  {
    title: 'User Settings',
    path: '/settings/user'
  }
];

export function UserSettings(props: Props) {
  return (
    <PageWrapper>
      <PrimaryContent padding="2rem">
        <UserWrapper>
          <Spacing margin="2rem 0">
            <Breadcrumbs crumbs={userCrumb} />
          </Spacing>
          <H3 type="secondary">User Settings</H3>
          <S1 weight="300">
            <i>User Information and settings</i>
          </S1>
          <ContactInfoContainer />
        </UserWrapper>
      </PrimaryContent>
    </PageWrapper>
  );
}

function mapStateToProps(state) {
  return {
    clientState: state.client
  };
}

export default withRouter(connect(mapStateToProps)(UserSettings));
