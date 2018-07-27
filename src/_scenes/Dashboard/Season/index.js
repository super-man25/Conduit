import {
  H1,
  Spacing,
  PageWrapper,
  Flex,
  Button,
  CenteredLoader
} from '_components';
import SeasonRevenuePanel from './components/SeasonRevenuePanel';
import React from 'react';
import { withSidebar } from '_hoc';
import { TicketIntegrations } from './components/TicketIntegrations';
import { connect } from 'react-redux';
import { selectors } from '_state/season';
import { createStructuredSelector } from 'reselect';

const SeasonOverviewTitle = H1.extend`
  margin: ${(props) => (props.sidebarIsOpen ? '0' : '0 0 0 1rem')};
`;

const ToggleButton = Button.extend`
  margin: 0;
`;

const Season = ({ isSidebarOpen, toggleSidebar, activeSeason, loading }) => {
  if (loading) {
    return (
      <div style={{ position: 'relative', height: '100%', width: '100%' }}>
        <CenteredLoader />
      </div>
    );
  }

  if (!activeSeason) {
    return (
      <div style={{ position: 'relative', height: '100%', width: '100%' }}>
        <Flex align="center" justify="center">
          No Season Selected
        </Flex>
      </div>
    );
  }

  return (
    <PageWrapper>
      <Spacing padding="1.5rem 2rem">
        <Flex align="center" margin="0 0 1.5rem">
          {!isSidebarOpen && (
            <ToggleButton small expand onClick={toggleSidebar} />
          )}
          <SeasonOverviewTitle weight="400" sidebarIsOpen={isSidebarOpen}>
            Season Overview - {activeSeason && activeSeason.name}
          </SeasonOverviewTitle>
        </Flex>
        <SeasonRevenuePanel />
        <Spacing height="2rem" />
        <TicketIntegrations />
      </Spacing>
    </PageWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  activeSeason: selectors.selectActiveSeason,
  loading: selectors.selectLoading
});

export default connect(mapStateToProps)(withSidebar(Season));
