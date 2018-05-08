import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { scaleToRight } from './keyframes';
import { cssConstants } from '_constants';

const BarContainer = styled.div`
  overflow: hidden;
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
  animation: ${scaleToRight} 1.5s ease-in-out;

  &:not(:last-child) {
    border-right: 1px solid ${cssConstants.PRIMARY_WHITE};
  }
`;

HorizontalBar.defaultProps = {
  backgroundColor: cssConstants.PRIMARY_DARK_BLUE
};

export const HorizontalBars = ({ data, colors }) => {
  const sum = data.reduce((acc, value) => acc + value, 0);

  return (
    <BarContainer>
      {data.map((value, idx) => (
        <HorizontalBar
          key={idx}
          backgroundColor={colors[idx]}
          width={value / sum * 100}
        />
      ))}
    </BarContainer>
  );
};

HorizontalBars.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string)
};

HorizontalBar.defaultProps = {
  colors: []
};
