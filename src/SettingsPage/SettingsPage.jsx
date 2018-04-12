import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { OuterWrapper, SiteHeader, ContentWrapper, LeftNav, MainContent, Breadcrumbs, ScreenTitleBlock, H3 } from '../_components';
import ContactInfoSettings from './ContactInfoSettings';
import NotificationSettings from './NotificationSettings';
import TeamSettings from './TeamSettings';

class SettingsPage extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }  

  handleLogoutClick(e) {
    e.preventDefault();
    this.props.dispatch(userActions.logout());
  }
  
  componentDidMount() {
    // this.props.dispatch(userActions.getAll());
  }

  handleDeleteUser(id) {
    return (e) => this.props.dispatch(userActions.delete(id));
  }

  render() {
    // const { user, users } = this.props;
    return (
      <OuterWrapper>
        <SiteHeader />
        <ContentWrapper>
          <LeftNav>
            Navigation Links here
            <br />
            <br />
            <Link to="/dashboard/users/create">Create New User</Link>
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
            <TeamSettings>
              Some Team settings here...
            </TeamSettings>                           
          </MainContent>
        </ContentWrapper>         
      </OuterWrapper>
    );
  }
}

export { SettingsPage as SettingsPageTest };

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

const connectedSettingsPage = connect(mapStateToProps)(SettingsPage);
export { connectedSettingsPage as SettingsPage };