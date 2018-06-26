import { H1, Spacing, PageWrapper, Flex, Button } from '_components';
import SeasonRevenuePanel from './components/SeasonRevenuePanel';
import React from 'react';
import styled from 'styled-components';
import { withSidebar } from '_hoc';
import { TicketIntegrations } from './components/TicketIntegrations';

const ContentMock = styled.div`
  margin: 64px 0;
  width: 100%;
  height: 720px;
  background-color: #ddd;
`;

const SeasonOverviewTitle = H1.extend`
  margin: ${(props) => (props.sidebarIsOpen ? '0' : '0 0 0 1rem')};
`;

const ToggleButton = Button.extend`
  margin: 0;
`;

const Season = ({ isSidebarOpen, toggleSidebar }) => (
  <PageWrapper>
    <Spacing padding="1.5rem 2rem">
      <Flex align="center" margin="0 0 1.5rem">
        {!isSidebarOpen && (
          <ToggleButton small expand onClick={toggleSidebar} />
        )}
        <SeasonOverviewTitle weight="400" sidebarIsOpen={isSidebarOpen}>
          Season Overview
        </SeasonOverviewTitle>
      </Flex>
      <SeasonRevenuePanel />
      <Spacing height="2rem" />
      <TicketIntegrations />
      <ContentMock />
      <ContentMock />
      <ContentMock />
      <ContentMock />
    </Spacing>
  </PageWrapper>
);

export default withSidebar(Season);
