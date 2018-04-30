import React from 'react';
import EventListContainer from './containers/EventListContainer';
import TeamOverview from './components/TeamOverview';
import styled from 'styled-components';
import { cssConstants } from '../../_constants';
import { Switch, Route, Redirect } from 'react-router';

import Season from './scenes/Season';
import Event from './scenes/Event';

import {
  Button,
  FlexItem,
  Sidebar,
  SidebarHeader,
  SiteHeader,
  Spacing
} from '../../_components';

const PageWrapper = styled.div`
  background-color: ${cssConstants.PRIMARY_LIGHTEST_GRAY};
  position: absolute;
  min-height: 100%;
  width: 100%;
`;

const FullContent = styled.div`
  display: flex;
  direction: row;
  min-height: calc(100% - 70px);
`;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarCollapsed: false
    };

    this.handleSidebarToggleClick = this.handleSidebarToggleClick.bind(this);
  }

  handleSidebarToggleClick() {
    this.setState((prevState) => {
      return { sidebarCollapsed: !prevState.sidebarCollapsed };
    });
  }

  render() {
    const { sidebarCollapsed } = this.state;
    return (
      <PageWrapper>
        <SiteHeader />
        <FullContent>
          <Sidebar collapsed={sidebarCollapsed}>
            <SidebarHeader>
              <TeamOverview>
                <Button small collapse onClick={this.handleSidebarToggleClick} />
              </TeamOverview>
            </SidebarHeader>
            <EventListContainer />
          </Sidebar>
          <FlexItem>
            <Spacing padding="16px 32px">
              <Switch>
                <Route path="/season" component={Season} />
                <Route path="/event/:id" component={Event} />
                <Redirect to="/season" />
              </Switch>
            </Spacing>
          </FlexItem>
        </FullContent>
      </PageWrapper>
    );
  }
}

export default Dashboard;
