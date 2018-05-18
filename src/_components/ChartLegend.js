// @flow
import React from 'react';
import type { ComponentType } from 'react';
import styled from 'styled-components';
import { cssConstants } from '_constants';

export const ChartLegendItemContainer: ComponentType<{}> = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: flex-end;
  max-width: 85px;

  & + & {
    margin-left: 16px;
  }
`;

export const ChartLegendBar: ComponentType<{
  dashed: boolean,
  color: string
}> = styled.div`
  height: 32px;
  min-width: 8px;
  background: ${(props) =>
    props.dashed
      ? `repeating-linear-gradient(to bottom, ${props.color}, ${
          props.color
        } 15%, transparent 15%, transparent 20%)`
      : props.color};
`;

export const ChartLegendLabel: ComponentType<{}> = styled.span`
  color: #323232;
  font-size: 12px;
  margin-left: 10px;
`;

ChartLegendItemContainer.displayName = 'ChartLegendItemContainer';
ChartLegendBar.displayName = 'ChartLegendBar';
ChartLegendLabel.displayName = 'ChartLegendLabel';

type Props = {
  label: string,
  color: string,
  dashed: boolean
};

export const ChartLegendItem = ({ label, color, dashed }: Props) => {
  return (
    <ChartLegendItemContainer>
      <ChartLegendBar dashed={dashed} color={color} />
      <ChartLegendLabel>{label}</ChartLegendLabel>
    </ChartLegendItemContainer>
  );
};

ChartLegendItem.defaultProps = {
  color: cssConstants.PRIMARY_LIGHT_BLUE
};
