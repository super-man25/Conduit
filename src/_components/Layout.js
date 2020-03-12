import React from 'react';
import styled from 'styled-components';

import { colors, navigationHeight } from '_constants';
import { SiteHeader } from './SiteHeader';

export const PageWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export const PrimaryContent = styled.div`
  background-color: ${colors.whiteSmoke};
  overflow-y: scroll;
  overflow-x: hidden;
  flex: 1;
  padding: 25px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const DualContent = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export const FullContent = styled.div`
  display: flex;
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
  position: absolute;
  top: ${navigationHeight}px;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Layout = ({ children }) => (
  <>
    <SiteHeader />
    <FullContent>{children}</FullContent>
  </>
);
