// @flow

import React from 'react';
import styled from 'styled-components';
import { scaleToRight } from './keyframes';
import { cssConstants } from '_constants';

const BarContainer = styled.div`
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  max-width: 100%;
  font-size: 0;
  margin: 0;
  padding: 0;
`;

const HorizontalBar = styled.div`
  background-color: ${(props) => props.backgroundColor};
  box-sizing: border-box;
  display: inline-block;
  height: 25px;
  width: ${(props) => `${props.width}%` || 'auto'};
  transform-origin: left;
  transition: width 0.5s ease-in-out;
  animation: ${scaleToRight} 1s ease-in-out;

  &:not(:last-child) {
    border-right: 1px solid ${cssConstants.PRIMARY_WHITE};
  }
`;

HorizontalBar.defaultProps = {
  backgroundColor: cssConstants.PRIMARY_BLUE
};

type HorizontalBarProps = {
  data: number[],
  colors: string[]
};

export const HorizontalBars = ({ data, colors }: HorizontalBarProps) => {
  const sum = data.reduce((acc, value) => acc + value, 0);

  return (
    <BarContainer>
      {data.map((value, idx) => (
        <HorizontalBar
          key={idx}
          backgroundColor={colors[idx]}
          width={((value / sum) * 100).toFixed(2)}
        />
      ))}
    </BarContainer>
  );
};

HorizontalBar.defaultProps = {
  colors: []
};
