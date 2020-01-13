// @flow

import styled from 'styled-components';
import {
  Breadcrumbs,
  Flex,
  H3,
  PageWrapper,
  PrimaryContent,
  S1,
  Spacing,
} from '_components';
import React from 'react';
import ContactInfoContainer from './containers/ContactInfoContainer';

const UserWrapper = styled(Flex)`
  flex-direction: column;
  justify-content: left;
  min-width: 100%;
`;

const userCrumb = [
  {
    title: 'Dashboard',
    path: '/dashboard',
  },
  {
    title: 'User Settings',
    path: '/settings/user',
  },
];

function UserSettings() {
  return (
    <PageWrapper>
      <PrimaryContent padding="2rem">
        <UserWrapper>
          <Spacing margin="2rem 0">
            <Breadcrumbs crumbs={userCrumb} />
          </Spacing>
          <H3 type="secondary" size="28px" weight="heavy">
            User Settings
          </H3>
          <S1 weight="300">
            <i>User Information and Settings</i>
          </S1>
          <ContactInfoContainer />
        </UserWrapper>
      </PrimaryContent>
    </PageWrapper>
  );
}

export default UserSettings;
