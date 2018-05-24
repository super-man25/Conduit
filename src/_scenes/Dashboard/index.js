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
import { toggleSidebar } from './stateChanges';
import { connect } from 'react-redux';
import { actions as teamStatActions } from '_state/teamStat';
import { actions as authActions } from '_state/auth';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.teamStatActions.fetch();
  }

  constructor(props) {
    super(props);

    this.state = {
      sidebarCollapsed: false
    };
  }

  handleSidebarToggleClick = () => {
    this.setState(toggleSidebar);
  };

  render() {
    const { sidebarCollapsed } = this.state;
    const { teamStatState, authState, authActions } = this.props;

    return (
      <PageWrapper>
        <SiteHeader auth={authState.model} authActions={authActions} />
        <FullContent>
          <Sidebar collapsed={sidebarCollapsed}>
            <SidebarHeader>
              <TeamOverview
                onToggleSidebar={this.handleSidebarToggleClick}
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
    authState: state.auth
  };
}

function mapActionCreators(dispatch) {
  return {
    teamStatActions: bindActionCreators(teamStatActions, dispatch),
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapActionCreators)(Dashboard)
);
