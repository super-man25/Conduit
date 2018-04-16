import React from 'react';
import styled from 'styled-components';
import paths from './icons.data';

const Svg = styled.svg`
  display: inline-block;
  vertical-align: middle;

  path {
    fill: ${(props) => props.color};
  }
`;

export const Icon = (props) => {
  const {
    name,
    size,
    color,
    data
  } = props;

  const path = data || paths[name];

  return (
    <Svg
      color={props.color}
      width={`${props.size}px`}
      viewBox="0 0 24 24"
    >
      <path d={path} />
    </Svg>
  );
};
