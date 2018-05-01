import React from 'react';
import styled from 'styled-components';
import paths from './icons.data';
import PropTypes from 'prop-types';

const Svg = styled.svg`
  display: inline-block;
  vertical-align: middle;

  path {
    fill: ${(props) => props.color};
  }
`;

export const Icon = (props) => {
  const { name, size, color, data } = props;

  const path = data || paths[name];

  return (
    <Svg color={color} width={`${size}px`} viewBox="0 0 24 24">
      <path d={path} />
    </Svg>
  );
};

Icon.propTypes = {
  /** The name of the icon as defined in icons.data.json */
  name: PropTypes.string,

  /** Raw path data that takes precedence over name */
  data: PropTypes.string,

  /** Size (in pixels) of the icon */
  size: PropTypes.number,

  /** HTML color (HEX or color string) for the icon fill  */
  color: PropTypes.string
};
