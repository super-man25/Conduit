// @flow

import * as React from 'react';
import styled from 'styled-components';

import { cssConstants, mobileBreakpoint } from '_constants';

type Props = {
  collapsed: boolean
};

export const Sidebar: React.ComponentType<Props> = styled.div`
  max-width: 500px;
  min-width: 380px;
  visibility: visible;
  border-right: 1px solid ${cssConstants.PRIMARY_LIGHT_GRAY};
  transition: 0.1s ease-in-out transform;
  background-color: white;

  ${(props) =>
    props.collapsed &&
    `
    overflow: hidden;
    transform: translate3d(-100%, 0, 0);
    width: 0;
    max-width: 0;
    min-width: 0;
    overflow-x: hidden;
  `};

  @media (max-width: ${mobileBreakpoint}px) {
    position: absolute;
    z-index: 1;
    height: 100%;
  }
`;
