import { H1, CenteredContainer } from '_components';
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
  <CenteredContainer>
    <H1 weight="100">Season Overview</H1>
    <SeasonRevenuePanel />
    <ContentMock />
    <ContentMock />
    <ContentMock />
    <ContentMock />
  </CenteredContainer>
);

export default Season;
