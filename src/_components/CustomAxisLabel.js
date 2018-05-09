import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AxisLabel = styled.text`
  font-size: 12px;
  color: #323232;
`;

export const CustomAxisLabel = ({ title, xAxis, innerWidth, innerHeight }) => {
  let offset;

  if (xAxis) {
    offset = {
      x: innerWidth / 2,
      y: 1.13 * innerHeight
    };
  } else {
    offset = {
      x: 0,
      y: innerHeight / 2 + title.length * 3
    };
  }

  const transform = xAxis
    ? `translate(${offset.x}, ${offset.y})`
    : `translate(${offset.x}, ${offset.y}) rotate(-90)`;

  return (
    <g transform={transform}>
      <AxisLabel>{title}</AxisLabel>
    </g>
  );
};

CustomAxisLabel.propTypes = {
  title: PropTypes.string,
  xAxis: PropTypes.bool,
  innerWidth: PropTypes.number,
  innerHeight: PropTypes.number
};

CustomAxisLabel.requiresSVG = true;
