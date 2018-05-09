import React from 'react';
import styled from 'styled-components';

import { H1 } from '_components';
import CumulativeRevenueContainer from 'scenes/Dashboard/containers/CumulativeRevenueContainer';

const CenteredContainer = styled.div`
  max-width: 1440px;
  margin: auto;
`;

const ContentMock = styled.div`
  margin: 64px 0;
  width: 100%;
  height: 720px;
  background-color: #ddd;
`;

const Season = () => (
  <CenteredContainer>
    <H1 weight="100">Season Overview</H1>
    <CumulativeRevenueContainer />
    <ContentMock />
    <ContentMock />
    <ContentMock />
    <ContentMock />
  </CenteredContainer>
);

export default Season;
