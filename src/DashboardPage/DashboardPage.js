import React from 'react';
import { connect } from 'react-redux';

import { OuterWrapper, ContentWrapper, SiteHeader, Sidebar, SidebarHeader, Button, MainContent, Breadcrumbs, H4, H5 } from '../_components';
import EventList from './EventList';
import TeamOverview from './TeamOverview';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarCollapsed: false
    };

    this.handleSidebarToggleClick = this.handleSidebarToggleClick.bind(this);
  }

  componentDidMount() {
    // probably will need something here...
  }

  handleSidebarToggleClick() {
    this.setState((prevState) => {
      return { sidebarCollapsed: !prevState.sidebarCollapsed };
    });
  }

  render() {
    // const { user, event, events } = this.props;
    const { sidebarCollapsed } = this.state;
    return (
      <OuterWrapper>
        <SiteHeader />
        <ContentWrapper>
          <Sidebar collapsed={sidebarCollapsed}>
            <SidebarHeader>
              <TeamOverview>
                <Button small collapse onClick={this.handleSidebarToggleClick} />
              </TeamOverview>
            </SidebarHeader>
            <EventList />
          </Sidebar>
          <MainContent sidebar={!sidebarCollapsed}>
            <Breadcrumbs>Dashboard / Game / Inventory</Breadcrumbs>
            <Button hidden={!sidebarCollapsed} expand onClick={this.handleSidebarToggleClick} />
            <H4 floatLeft>Some Title Here</H4>
            <H5 clearLeft> More stuff here... </H5>
          </MainContent>
        </ContentWrapper>
      </OuterWrapper>
    );
  }
}

function mapStateToProps(state) {
  const { event, events, authentication } = state;
  const { user } = authentication;
  return {
    user,
    events,
    event
  };
}

const connectedDashboardPage = connect(mapStateToProps)(DashboardPage);
export { connectedDashboardPage as DashboardPage };