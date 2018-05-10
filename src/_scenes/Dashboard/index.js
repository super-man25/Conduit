import {
  Button,
  Sidebar,
  SidebarHeader,
  SiteHeader,
  Spacing,
  TeamOverview
} from '_components';
import { cssConstants } from '_constants';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import styled from 'styled-components';
// TODO: Resolve Event imports...
import Event from './Event';
import EventListContainer from './Event/containers/EventListContainer';
import Season from './Season';
import { toggleSidebar } from './stateChanges';

const PageWrapper = styled.div`
  background-color: ${cssConstants.PRIMARY_LIGHTEST_GRAY};
  position: absolute;
  height: 100%;
  width: 100%;
`;

const FullContent = styled.div`
  display: flex;
  position: absolute;
  top: 70px;
  bottom: 0;
  left: 0;
  right: 0;
`;

const PrimaryContent = styled.div`
  overflow-y: scroll;
  flex: 1;
`;

const SidebarContent = styled.div`
  height: calc(100% - 116px);
`;

class Dashboard extends React.Component {
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
    return (
      <PageWrapper>
        <SiteHeader />
        <FullContent>
          <Sidebar collapsed={sidebarCollapsed}>
            <SidebarHeader>
              <TeamOverview onToggleSidebar={this.handleSidebarToggleClick} />
            </SidebarHeader>
            <SidebarContent>
              <EventListContainer />
            </SidebarContent>
          </Sidebar>
          <PrimaryContent>
            <Spacing padding="16px 32px">
              <Switch>
                <Route path="/season" component={Season} />
                <Route path="/event/:id" component={Event} />
                <Redirect to="/season" />
              </Switch>
            </Spacing>
          </PrimaryContent>
        </FullContent>
      </PageWrapper>
    );
  }
}

export default Dashboard;
