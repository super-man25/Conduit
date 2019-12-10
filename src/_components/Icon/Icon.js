// @flow
import React from 'react';
import styled from 'styled-components';
import paths from './icons.data';

const StyledIcon = styled.div`
  cursor: ${({ onClick }) => onClick && 'pointer'};
`;

type Props = {
  className: string,

  /** The name of the icon as defined in icons.data.json */
  name: string,

  /** Raw path data that takes precedence over name */
  size: number,

  /** HTML color (HEX or color string) for the icon fill  */
  color: string
};

export const Icon = ({ name, size, color, ...rest }: Props) => {
  return (
    <StyledIcon {...rest}>
      <svg
        fill={color}
        width={`${size}px`}
        height={`${size}px`}
        viewBox="0 0 24 24"
      >
        {paths[name] &&
          paths[name].map((path, idx) => (
            <path d={path} key={`${name}-${idx}`} />
          ))}
      </svg>
    </StyledIcon>
  );
};
