import React from 'react';
import styled from 'styled-components';
import EdLogo from '_images/logo.svg';
import { Flex } from './Flex';

const LogoContainer = styled(Flex)`
  cursor: pointer;
`;

export const LogoName = ({ onClick }) => (
  <LogoContainer
    align="center"
    height="100%"
    justify="space-between"
    onClick={onClick}
  >
    <img src={EdLogo} alt="Event Dynamic" />
  </LogoContainer>
);
