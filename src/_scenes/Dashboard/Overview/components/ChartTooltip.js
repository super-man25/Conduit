// @flow
import * as React from 'react';
import type { ComponentType } from 'react';
import styled from 'styled-components';
import { colors } from '_constants';
import { Flex } from '_components';

const TooltipContainer: ComponentType<{}> = styled.div`
  border: 1px solid ${colors.lightGray};
  min-width: 175px;
  font-size: 14px;
  background-color: ${colors.white};
  color: ${colors.black};
`;

const TooltipHeader: ComponentType<{}> = styled.header`
  background-color: ${colors.blue};
  color: ${colors.white};
  font-weight: 300;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
`;

export const TooltipHeaderText: ComponentType<{}> = styled.p`
  margin: 0;
  padding: 0;
  font-size: 11px;
  font-weight: 300;
`;

const TooltipBody: ComponentType<{}> = styled.section`
  padding: 0.75rem 1rem;
`;

export const TooltipBodyTitle: ComponentType<{}> = styled.h3`
  margin: 0 15px 0 0;
  padding: 0;
  font-size: 12px;
  font-weight: 400;
`;

export const TooltipBodyText: ComponentType<{}> = styled.p`
  margin: 0;
  padding: 0;
  font-size: 16px;
  color: ${colors.black};
`;

export const TooltipRow: ComponentType<{}> = styled((props) => (
  <Flex {...props} />
))`
  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
`;

type Props = {
  headerText: string,
  bodyJson: Object,
};

export const ChartTooltip = ({ headerText, bodyJson }: Props) => (
  <TooltipContainer>
    <TooltipHeader>
      <TooltipHeaderText>{headerText}</TooltipHeaderText>
    </TooltipHeader>
    <TooltipBody>
      {Object.keys(bodyJson).map((key) => (
        <TooltipRow key={key} justify="space-between" align="center">
          <TooltipBodyTitle>{key}</TooltipBodyTitle>
          <TooltipBodyText className="private">{bodyJson[key]}</TooltipBodyText>
        </TooltipRow>
      ))}
    </TooltipBody>
  </TooltipContainer>
);
