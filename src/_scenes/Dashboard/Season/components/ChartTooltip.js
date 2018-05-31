// @flow
import * as React from 'react';
import type { ComponentType } from 'react';
import styled from 'styled-components';
import { cssConstants } from '_constants';

const TooltipContainer: ComponentType<{}> = styled.div`
  border: 1px solid ${cssConstants.PRIMARY_DARK_GRAY};
  box-shadow: 0 1px 1px 0 #bbbbbb;
  width: 150px;
  font-size: 14px;
  background-color: ${cssConstants.PRIMARY_WHITE};
  color: ${cssConstants.PRIMARY_LIGHT_BLACK};
`;

const TooltipHeader: ComponentType<{}> = styled.header`
  background-color: ${cssConstants.PRIMARY_DARK_BLUE};
  color: ${cssConstants.PRIMARY_WHITE};
  font-weight: 300;
  padding: 4px 12px;
  text-transform: uppercase;
`;

export const TooltipHeaderText: ComponentType<{}> = styled.p`
  margin: 0;
  padding: 0;
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 300;
`;

const TooltipBody: ComponentType<{}> = styled.section`
  padding: 6px 12px;
`;

export const TooltipBodyTitle: ComponentType<{}> = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 12px;
  font-weight: 400;
`;

export const TooltipBodyText: ComponentType<{}> = styled.p`
  margin: 0;
  padding: 0;
  font-size: 16px;
  color: ${cssConstants.PRIMARY_LIGHT_BLACK};
`;

type Props = {
  headerComponent: React.Node,
  bodyComponent: React.Node
};

export const ChartTooltip = ({ headerComponent, bodyComponent }: Props) => (
  <TooltipContainer>
    <TooltipHeader>{headerComponent}</TooltipHeader>
    <TooltipBody>{bodyComponent}</TooltipBody>
  </TooltipContainer>
);
