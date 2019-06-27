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
import { Event } from './Event';
import EventListContainer from './Event/containers/EventListContainer';
import Season from './Season';
import { connect } from 'react-redux';
import { actions as teamStatActions } from '_state/teamStat';
import { actions as uiActions, selectors as uiSelectors } from '_state/ui';
import { actions as clientActions } from '_state/client';
import { actions as clientListActions } from '_state/clientList';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.teamStatActions.fetch();
    this.props.clientActions.fetchIntegrations();
    this.props.clientListActions.fetchClientList();
  }

  statsForSeason(allSeasonsStats, seasonId) {
    var activeSeasonStats = null;
    allSeasonsStats.forEach((stats) => {
      if (stats.seasonId === seasonId) {
        activeSeasonStats = stats;
      }
    });
    return activeSeasonStats;
  }

  render() {
    const {
      activeSeasonState,
      teamStatState,
      uiActions: { toggleSidebar },
      sidebarIsOpen
    } = this.props;

    return (
      <PageWrapper>
        <SiteHeader />
        <FullContent>
          <Sidebar collapsed={!sidebarIsOpen}>
            <SidebarHeader>
              <TeamOverview
                onToggleSidebar={toggleSidebar}
                stats={this.statsForSeason(
                  teamStatState.allSeasons,
                  activeSeasonState
                )}
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
  activeSeasonState: PropTypes.number,
  teamStatState: PropTypes.shape(),
  teamStatActions: PropTypes.shape()
};

function mapStateToProps(state) {
  return {
    activeSeasonState: state.season.activeId,
    teamStatState: state.teamStat,
    sidebarIsOpen: uiSelectors.selectIsSidebarOpen(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    teamStatActions: bindActionCreators(teamStatActions, dispatch),
    uiActions: bindActionCreators(uiActions, dispatch),
    clientActions: bindActionCreators(clientActions, dispatch),
    clientListActions: bindActionCreators(clientListActions, dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dashboard)
);
