import React from 'react';
import styled from 'styled-components';

import {
  H1
} from '../../../../_components';

const CenteredContainer = styled.div`
  max-width: 1440px;
  margin: auto;
`;

const Season = () => (
  <CenteredContainer>
    <H1>Season</H1>
  </CenteredContainer>
);

export default Season;
