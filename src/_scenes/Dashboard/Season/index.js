import styled from 'styled-components';
import {
  H1,
  Spacing,
  PageWrapper,
  Flex,
  TextButton,
  Icon,
  CenteredLoader
} from '_components';
import SeasonRevenuePanel from './components/SeasonRevenuePanel';
import React from 'react';
import { withSidebar } from '_hoc';
import { SeasonTicketIntegrations } from './components/SeasonTicketIntegrations';
import { connect } from 'react-redux';
import { selectors } from '_state/season';
import { createStructuredSelector } from 'reselect';
import { cssConstants } from '_constants';

const SeasonOverviewTitle = styled(H1)`
  margin: ${(props) => (props.sidebarIsOpen ? '0' : '0 0 0 1rem')};
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
            <TextButton onClick={toggleSidebar}>
              <Icon
                name="arrow-right"
                size={48}
                color={cssConstants.PRIMARY_BLUE}
              />
            </TextButton>
          )}
          <SeasonOverviewTitle weight="400" sidebarIsOpen={isSidebarOpen}>
            Season Overview - {activeSeason && activeSeason.name}
          </SeasonOverviewTitle>
        </Flex>
        <SeasonRevenuePanel />
        <Spacing height="2rem" />
        <SeasonTicketIntegrations id={activeSeason.id} />
      </Spacing>
    </PageWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  activeSeason: selectors.selectActiveSeason,
  loading: selectors.selectLoading
});

export default connect(mapStateToProps)(withSidebar(Season));
