// @flow
import React from 'react';
import type { ComponentType } from 'react';
import styled from 'styled-components';

import { colors } from '_constants';

const LegendItemContainer: ComponentType<{}> = styled.div`
  display: inline-flex;
`;

const LegendItemColoredBar: ComponentType<{ color: string }> = styled.div`
  background-color: ${(props) => props.color};
  margin-right: 14px;
  min-width: 7px;
`;

const LegendItemContent: ComponentType<{}> = styled.div`
  display: flex;
  flex-direction: column;
`;

const LegendItemTitle: ComponentType<{}> = styled.span`
  color: ${colors.black};
  font-size: 12px;
  margin-bottom: 2px;
`;

const LegendItemValue: ComponentType<{}> = styled.span`
  font-size: 18px;
  letter-spacing: 0.4;
`;

LegendItemContainer.displayName = 'LegendItemContainer';
LegendItemColoredBar.displayName = 'LegendItemColoredBar';
LegendItemContent.displayName = 'LegendItemContent';
LegendItemTitle.displayName = 'LegendItemTitle';
LegendItemValue.displayName = 'LegendItemValue';

type Props = {
  color: string,
  label: string,
  value: number | string,
};

export function LegendItem({ color, label, value }: Props) {
  return (
    <LegendItemContainer>
      <LegendItemColoredBar color={color} />
      <LegendItemContent>
        <LegendItemTitle>{label}</LegendItemTitle>
        <LegendItemValue className="private">{value}</LegendItemValue>
      </LegendItemContent>
    </LegendItemContainer>
  );
}
