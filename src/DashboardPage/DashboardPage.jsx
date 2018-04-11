import React from 'react';
import { connect } from 'react-redux';

import { OuterWrapper, ContentWrapper, SiteHeader, Sidebar, SidebarHeader, MainContent, Breadcrumbs } from '../_components'
import EventList from './EventList';
import TeamOverview from './TeamOverview';

class DashboardPage extends React.Component {   
  constructor(props) {
    super(props);

    this.handleSidebarCollapseClick = this.handleSidebarCollapseClick.bind(this);
  }
  componentDidMount() {
      // probably will need something here...
  }

  handleSidebarCollapseClick(e) {
    //
  }

  render() {
    // const { user, event, events } = this.props;
    return (
      <OuterWrapper>
        <SiteHeader />
        <ContentWrapper>
          <Sidebar>
            <SidebarHeader>
              <TeamOverview />
            </SidebarHeader>
            <EventList />  
          </Sidebar>
          <MainContent sidebar>
            <Breadcrumbs>Dashboard / Game / Inventory</Breadcrumbs>
            <div> More stuff here... </div>                           
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