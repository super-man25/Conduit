import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
<<<<<<< HEAD:ed-web/src/SettingsPage/SettingsPage.jsx
import PropTypes from 'prop-types';

import { userActions } from '../_actions';
import { OuterWrapper, SiteHeader, ContentWrapper, LeftNav, MainContent, Breadcrumbs, ScreenTitleBlock, H3 } from '../_components';
import ContactInfoSettings from './ContactInfoSettings';
import NotificationSettings from './NotificationSettings';
import { TeamSettings } from './TeamSettings';

class SettingsPage extends React.Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  componentDidMount() {
    // this.props.dispatch(clientActions.getClient(localStorage.getItem('user').id));
  }

  handleLogoutClick(e) {
    e.preventDefault();
    console.log('~~~~~ using this.something ~~~~~', this);
    this.props.dispatch(userActions.logout());
  }


  handleDeleteUser(id) {
    return () => this.props.dispatch(userActions.delete(id));
=======
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
  H3
} from '../../_components';

import ContactInfoSettings from './components/ContactInfoSettings';
import NotificationSettings from './components/NotificationSettings';
import TeamSettings from './components/TeamSettings';

class SettingsPage extends React.Component {
  componentDidMount() {
    // this.props.dispatch(userActions.getAll());
  }

  handleLogoutClick = (e) => {
    e.preventDefault();
    this.props.userActions.signOut();
>>>>>>> develop:ed-web/src/scenes/Settings/index.js
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
<<<<<<< HEAD:ed-web/src/SettingsPage/SettingsPage.jsx
            <TeamSettings />
=======
            <TeamSettings>
              Some Team settings here...
            </TeamSettings>
>>>>>>> develop:ed-web/src/scenes/Settings/index.js
          </MainContent>
        </ContentWrapper>
      </OuterWrapper>
    );
  }
}

SettingsPage.propTypes = {
  // user: PropTypes.object, // refer to model ? (that does not exist, and is not imported as yet)
  // client: PropTypes.object, // refer to model ? (that does not exist, and is not imported as yet)
  // alert: PropTypes.object, // refer to model ? (that does not exist, and is not imported as yet)
  dispatch: PropTypes.func
};

export { SettingsPage as SettingsPageTest };

function mapStateToProps(state) {
<<<<<<< HEAD:ed-web/src/SettingsPage/SettingsPage.jsx
  const { authentication } = state;
  const { user } = authentication;
  return {
    user
  };
}

const connectedSettingsPage = connect(mapStateToProps)(SettingsPage);
export { connectedSettingsPage as SettingsPage };
=======
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
>>>>>>> develop:ed-web/src/scenes/Settings/index.js
