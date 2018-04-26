import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as authActions } from '../../state/auth';

import {
  OuterWrapper,
  SiteHeader,
  ContentWrapper,
  LeftNav,
  MainContent,
  Breadcrumbs,
  ScreenTitleBlock,
  H3
} from '../../_components';

import ContactInfoSettings from './components/ContactInfoSettings';
import NotificationSettings from './components/NotificationSettings';
import { TeamSettings } from './components/TeamSettings';

class SettingsPage extends React.Component {
  handleLogoutClick = (e) => {
    e.preventDefault();
    authActions.signOut();
  }

  render() {
    // const { user } = this.props;
    return (
      <OuterWrapper>
        <SiteHeader />
        <ContentWrapper>
          <LeftNav>
            Navigation Links here
            <br />
            <br />
            <Link to="/users/create">Create New User</Link>
            <br />
            <br />
            <br />
            <br />
            <Link to="/logout" onClick={this.handleLogoutClick}>Logout</Link>
          </LeftNav>
          <MainContent leftNav>
            <Breadcrumbs>Dashboard / Settings / Users & Permissions</Breadcrumbs>
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
          </MainContent>
        </ContentWrapper>
      </OuterWrapper>
    );
  }
}

SettingsPage.propTypes = {
  // user: PropTypes.object, // refer to model ? (that does not exist, and is not imported as yet)
  // client: PropTypes.object, // refer to model ? (that does not exist, and is not imported as yet)
  // alert: PropTypes.object // refer to model ? (that does not exist, and is not imported as yet)
};

export { SettingsPage as SettingsPageTest };

function mapStateToProps(state) {
  return {
    userState: state.user
  };
}

function mapActionCreators(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapActionCreators)(SettingsPage);
