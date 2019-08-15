import React from 'react';
import { connect } from 'react-redux';
import { actions, selectors } from '_state/userList';
import { createStructuredSelector } from 'reselect';
import { Flex, PageWrapper, Breadcrumbs, Spacing, H3 } from '_components';
import { UsersTable } from './components/UsersTable';

const crumbs = [
  {
    title: 'Dashboard',
    path: '/dashboard'
  },
  {
    title: 'View Users',
    path: '/settings/users'
  }
];

export const UsersPresenter = (props) => {
  const { userList, fetchUserList, reset } = props;
  return (
    <PageWrapper>
      <Flex max-width="100%" height="100%" direction="column" padding="2rem">
        <Spacing margin="2rem 0">
          <Breadcrumbs crumbs={crumbs} />
        </Spacing>
        <H3 type="secondary" size="28px" weight="heavy">
          View Users
        </H3>
        <UsersTable
          userList={userList}
          fetchUserList={fetchUserList}
          reset={reset}
        />
      </Flex>
    </PageWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  userList: selectors.selectUserList
});
const mapDispatchToProps = {
  fetchUserList: actions.fetchUserList,
  reset: actions.resetUsers
};
export const Users = connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersPresenter);
