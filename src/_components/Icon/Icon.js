// @flow
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

type Props = {
  className?: string,
  /** The name of the icon as defined in icons.data.json */
  name: string,

  /** Raw path data that takes precedence over name */
  size: number,

  /** HTML color (HEX or color string) for the icon fill  */
  color: string
};

export const Icon = ({ className, name, size, color }: Props) => {
  return (
    <Svg
      className={className}
      color={color}
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 24 24"
    >
      {paths[name] &&
        paths[name].map((path, idx) => (
          <path d={path} key={`${name}-${idx}`} />
        ))}
    </Svg>
  );
};
