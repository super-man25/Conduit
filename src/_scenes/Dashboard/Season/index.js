import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { cssConstants, containerPadding } from '_constants';
import { selectors } from '_state/season';
import {
  H1,
  H4,
  Spacing,
  PageWrapper,
  Flex,
  TextButton,
  Center,
  Icon,
  CenteredLoader
} from '_components';
import SeasonRevenuePanel from './components/SeasonRevenuePanel';
import { SeasonTicketIntegrations } from './components/SeasonTicketIntegrations';
import { isMobileDevice } from '_helpers';
import { useSidebar } from '_hooks';

const SeasonOverviewTitle = styled(H1)``;

const Heading = styled(H4)`
  margin: 0;
  padding: 0;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.9px;
`;

const Season = ({ activeSeason, loading }) => {
  const [isSidebarOpen, toggleSidebar] = useSidebar();

  if (loading) {
    return (
      <PageWrapper style={{ position: 'relative' }}>
        <CenteredLoader />
      </PageWrapper>
    );
  }

  if (!activeSeason) {
    return (
      <PageWrapper style={{ position: 'relative' }}>
        <Center>
          <Heading data-test-id="no-season-message">No Season Selected</Heading>
        </Center>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Spacing padding={`${containerPadding}px`}>
        <Flex align="center" margin="0 0 1.5rem">
          {!isSidebarOpen && !isMobileDevice && (
            <TextButton
              onClick={toggleSidebar}
              padding="0"
              textAlign="left"
              minWidth="60px"
            >
              <Icon
                name="arrow-right"
                size={24}
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

export default connect(mapStateToProps)(Season);
