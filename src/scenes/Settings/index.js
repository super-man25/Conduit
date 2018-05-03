import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import authActions from '../../state/auth/actions';

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

export class SettingsPresenter extends React.Component {
  handleLogoutClick(e) {  // eslint-disable-line
    e.preventDefault();
    this.props.authActions.signOut();
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
            <Link id="logout" to="/logout" onClick={this.handleLogoutClick}>
              Logout
            </Link>
          </LeftNav>
          <MainContent leftNav>
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
          </MainContent>
        </ContentWrapper>
      </OuterWrapper>
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
