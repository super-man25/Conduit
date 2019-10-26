// @flow
import {
  FullContent,
  PageWrapper,
  PrimaryContent,
  SecuredRoute,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SiteHeader,
  TeamOverview
} from '_components';
import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { Event } from './Event';
import EventListContainer from './Event/containers/EventListContainer';
import Season from './Season';
import { connect } from 'react-redux';
import { actions as teamStatActions } from '_state/teamStat';
import { actions as uiActions, selectors as uiSelectors } from '_state/ui';
import { actions as clientActions } from '_state/client';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import type { TeamStatState } from '_state/teamStat';
import type { EDUser } from '_models/user';

type Props = {
  teamStatActions: typeof teamStatActions,
  clientActions: typeof clientActions,
  activeSeasonState: number,
  teamStatState: TeamStatState,
  sidebarIsOpen: boolean,
  uiActions: typeof uiActions,
  authState: {
    model: EDUser
  }
};

class Dashboard extends React.Component<Props> {
  componentDidMount() {
    this.props.teamStatActions.fetch();
    this.props.clientActions.fetchIntegrations();
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
      sidebarIsOpen,
      teamStatState,
      uiActions: { toggleSidebar },
      authState
    } = this.props;

    const isAuthorized = !!authState.model;

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
              <SecuredRoute
                path="/season"
                component={Season}
                authorized={isAuthorized}
              />
              <SecuredRoute
                path="/event/:id"
                component={Event}
                authorized={isAuthorized}
              />
              <Redirect to="/season" />
            </Switch>
          </PrimaryContent>
        </FullContent>
      </PageWrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeSeasonState: state.season.activeId,
    sidebarIsOpen: uiSelectors.selectIsSidebarOpen(state),
    teamStatState: state.teamStat,
    authState: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    teamStatActions: bindActionCreators(teamStatActions, dispatch),
    uiActions: bindActionCreators(uiActions, dispatch),
    clientActions: bindActionCreators(clientActions, dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dashboard)
);
