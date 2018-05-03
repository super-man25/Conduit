import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { cssConstants } from '../../_constants';
import authActions from '../../state/auth/actions';

import {
  SiteHeader,
  LeftNav,
  Breadcrumbs,
  ScreenTitleBlock,
  H3
} from '../../_components';

import ContactInfoSettings from './components/ContactInfoSettings';
import NotificationSettings from './components/NotificationSettings';
import TeamSettings from './components/TeamSettings';

// this could be a shared component for 'scenes'
const PageWrapper = styled.div`
  background-color: ${cssConstants.PRIMARY_LIGHTEST_GRAY};
  position: absolute;
  height: 100%;
  width: 100%;
`;

// this could be a shared component for 'scenes'
const FullContent = styled.div`
  display: flex;
  position: absolute;
  top: 70px;
  bottom: 0;
  left: 0;
  right: 0;
`;

// this could be a shared component for 'scenes' with a prop for padding
const PrimaryContent = styled.div`
  overflow-y: scroll;
  padding: 40px;
  flex: 1;
`;

export class SettingsPresenter extends React.Component {
  handleLogoutClick(e) {  // eslint-disable-line
    e.preventDefault();
    this.props.authActions.signOut();
  }

  render() {
    return (
      <PageWrapper>
        <SiteHeader />
        <FullContent>
          <LeftNav>
            Navigation Links here
            <br />
            <br />
            <Link to="/users/create">Create New User</Link>
            <br />
            <br />
            <br />
            <br />
            <Link
              id="logout"
              to="/logout"
              onClick={this.handleLogoutClick.bind(this)}
            >
              Logout
            </Link>
          </LeftNav>
          <PrimaryContent>
            <Breadcrumbs>
              Dashboard / Settings / Users & Permissions
            </Breadcrumbs>
            <ScreenTitleBlock>
              <H3 screenTitle>Users & Permissions</H3>
            </ScreenTitleBlock>
            <ContactInfoSettings>
              Some Contact Info settings here...
            </ContactInfoSettings>
            <NotificationSettings>
              Some Notification settings here...
            </NotificationSettings>
            <TeamSettings />
          </PrimaryContent>
        </FullContent>
      </PageWrapper>
    );
  }
}

SettingsPresenter.propTypes = {
  // user: PropTypes.object, // refer to model ? (that does not exist, and is not imported as yet)
  // client: PropTypes.object, // refer to model ? (that does not exist, and is not imported as yet)
  // alert: PropTypes.object // refer to model ? (that does not exist, and is not imported as yet)
};

function mapStateToProps(state) {
  return {
    userState: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPresenter);
