// @flow
import React from 'react';
import styled from 'styled-components';
import paths from './icons.data';

const StyledIcon = styled.svg`
  display: inline-block;
  vertical-align: middle;

  ${({ onClick }) =>
    onClick &&
    `
    cursor: pointer;
  `}

  path {
    fill: ${(props) => props.color};
  }
`;

type Props = {
  onClick: () => void,
  className?: string,
  name: string,
  size: number,
  color: string,
};

export const Icon = ({ onClick, className, name, size, color }: Props) => {
  return (
    <StyledIcon
      onClick={onClick}
      className={className}
      color={color}
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 24 24"
    >
      {paths[name] && <path d={paths[name]} />}
    </StyledIcon>
  );
};
