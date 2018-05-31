import {
  FullContent,
  PageWrapper,
  PrimaryContent,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SiteHeader,
  TeamOverview
} from '_components';
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Event from './Event';
import EventListContainer from './Event/containers/EventListContainer';
import Season from './Season';
import { connect } from 'react-redux';
import { actions as teamStatActions } from '_state/teamStat';
import { actions as authActions } from '_state/auth';
import { actions as uiActions } from '_state/ui';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.teamStatActions.fetch();
  }

  render() {
    const {
      teamStatState,
      authState,
      authActions,
      uiState: { sidebarIsOpen },
      uiActions: { toggleSidebar }
    } = this.props;

    return (
      <PageWrapper>
        <SiteHeader auth={authState.model} authActions={authActions} />
        <FullContent>
          <Sidebar collapsed={!sidebarIsOpen}>
            <SidebarHeader>
              <TeamOverview
                onToggleSidebar={toggleSidebar}
                stats={teamStatState.overview}
              />
            </SidebarHeader>
            <SidebarContent>
              <EventListContainer />
            </SidebarContent>
          </Sidebar>
          <PrimaryContent>
            <Switch>
              <Route path="/season" component={Season} />
              <Route path="/event/:id" component={Event} />
              <Redirect to="/season" />
            </Switch>
          </PrimaryContent>
        </FullContent>
      </PageWrapper>
    );
  }
}

Dashboard.propTypes = {
  teamStatState: PropTypes.shape(),
  teamStatActions: PropTypes.shape()
};

function mapStateToProps(state) {
  return {
    teamStatState: state.teamStat,
    authState: state.auth,
    uiState: state.ui
  };
}

function mapActionCreators(dispatch) {
  return {
    teamStatActions: bindActionCreators(teamStatActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch),
    uiActions: bindActionCreators(uiActions, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapActionCreators)(Dashboard)
);
