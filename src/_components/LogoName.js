import React from 'react';
import styled from 'styled-components';
import { cssConstants } from '_constants';
import edLogoWhite from '_images/eventdynamiclogooutline.svg';
import { H1 } from './StyledTags';
import { Flex } from './Flex';

const LogoContainer = styled(Flex)`
  cursor: pointer;
`;

const HeaderLogo = styled.img`
  height: 38px;
  width: auto;
  margin-right: 1rem;
`;

const HeaderTitle = styled(H1)`
  color: ${cssConstants.PRIMARY_WHITE};
  margin: 0;
  font-size: 1.5rem;
  letter-spacing: 0.5px;
  word-break: break-all;
`;

export const LogoName = ({ onClick }) => (
  <LogoContainer
    align="center"
    height="100%"
    justify="space-between"
    onClick={onClick}
  >
    <HeaderLogo src={edLogoWhite} />
    <HeaderTitle>EVENT DYNAMIC</HeaderTitle>
  </LogoContainer>
);
