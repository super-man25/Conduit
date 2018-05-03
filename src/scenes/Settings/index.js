import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as userActions } from '../../state/auth';

import {
  OuterWrapper,
  SiteHeader,
  ContentWrapper,
  LeftNav,
  MainContent,
  Breadcrumbs,
  ScreenTitleBlock,
  H3,
  P2,
  Spacing
} from '../../_components';

import ContactInfoSettings from './components/ContactInfoSettings';
import NotificationSettings from './components/NotificationSettings';
import TeamSettings from './components/TeamSettings';

class SettingsPage extends React.Component {
  componentDidMount() {}

  handleLogoutClick = (e) => {
    e.preventDefault();
    this.props.userActions.signOut();
  };

  render() {
    const { userState } = this.props;
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
            <Link to="/logout" onClick={this.handleLogoutClick}>
              Logout
            </Link>
          </LeftNav>
          <MainContent leftNav>
            <Breadcrumbs>
              Dashboard / Settings / Users & Permissions
            </Breadcrumbs>
            <ScreenTitleBlock>
              <H3 screenTitle>
                Users & Permissions
                <Spacing margin="10px 0 0 0">
                  <P2 color="black" weight="100">
                    <i>User Information and Team Settings</i>
                  </P2>
                </Spacing>
              </H3>
            </ScreenTitleBlock>
            <ContactInfoSettings />
            <NotificationSettings>
              Some Notification settings here...
            </NotificationSettings>
            <TeamSettings>Some Team settings here...</TeamSettings>
          </MainContent>
        </ContentWrapper>
      </OuterWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    userState: state.user
  };
}

function mapActionCreators(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapActionCreators)(SettingsPage);
