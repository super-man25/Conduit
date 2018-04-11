import React from 'react';
import { connect } from 'react-redux';

import { OuterWrapper, ContentWrapper, SiteHeader, Sidebar, SidebarHeader, Button, MainContent, Breadcrumbs, H4, H5 } from '../_components'
import EventList from './EventList';
import TeamOverview from './TeamOverview';

class DashboardPage extends React.Component {   
  constructor(props) {
    super(props);

    this.state = {
      sideBarCollapsed: false
    };

    this.handleSidebarToggleClick = this.handleSidebarToggleClick.bind(this);
  }
  componentDidMount() {
      // probably will need something here...
  }

  handleSidebarToggleClick(e) {
    console.log('~~~~~ expand/collapse toggle clicked - before updating this.state.sidebarCollapsed is ', this.state.sidebarCollapsed);
    this.setState((prevState) => {
      return { sideBarCollapsed: !prevState.sideBarCollapsed }
    });
  }

  render() {
    // const { user, event, events } = this.props;
    // const { sidebarCollapsed } = this.state;
    const sidebarCollapsed = true;
    console.log('~~~~~ sidebarCollapsed is ', sidebarCollapsed);
    return (
      <OuterWrapper>
        <SiteHeader />
        <ContentWrapper>
          <Sidebar collapsed={sidebarCollapsed}>
            <SidebarHeader>
              <TeamOverview>
                <Button small collapse onClick={this.handleSidebarToggleClick}></Button>
              </TeamOverview>
            </SidebarHeader>
            <EventList />  
          </Sidebar>
          <MainContent sidebar={!sidebarCollapsed}>
            <Breadcrumbs>Dashboard / Game / Inventory</Breadcrumbs>
            <Button hidden={!sidebarCollapsed} expand onClick={this.handleSidebarToggleClick}></Button>
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