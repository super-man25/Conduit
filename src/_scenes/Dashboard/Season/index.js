import { H1, Spacing, PageWrapper } from '_components';
import SeasonRevenuePanel from '_scenes/Dashboard/Season/containers/SeasonRevenuePanel';
import React from 'react';
import styled from 'styled-components';

const ContentMock = styled.div`
  margin: 64px 0;
  width: 100%;
  height: 720px;
  background-color: #ddd;
`;

const Season = () => (
  <PageWrapper>
    <Spacing padding="2rem">
      <H1>Season</H1>
      <SeasonRevenuePanel />
      <ContentMock />
      <ContentMock />
      <ContentMock />
      <ContentMock />
    </Spacing>
  </PageWrapper>
);

export default Season;
