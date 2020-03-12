import React from 'react';
import styled, { keyframes } from 'styled-components';
import { colors } from '_constants';

const smallHeight = 10;
const largeHeight = 14;
const smallWidth = 45;
const largeWidth = 75;

const StyledLoader = styled.div`
  ${({ centered }) =>
    centered &&
    `
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  `}
`;

const DotContainer = styled.div`
  display: flex;
  width: ${({ small }) => (small ? smallWidth : largeWidth)}px;
  height: ${({ small }) => (small ? smallHeight : largeHeight)}px;
`;

const dotAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  60% {
    opacity: 0;
  }
`;

const AnimatedDot = styled.div`
  width: ${({ small }) => (small ? smallHeight : largeHeight)}px;
  height: ${({ small }) => (small ? smallHeight : largeHeight)}px;
  border-radius: 100px;
  animation: ${dotAnimation} 1.3s ease infinite;
  animation-delay: ${(props) => `${0.1 + props.index * 0.2}s`};
  background-color: ${colors.blue};

  & + & {
    margin-left: 5px;
  }
`;

export const Loader = ({ small, centered }) => (
  <StyledLoader centered={centered}>
    <DotContainer small={small}>
      <AnimatedDot index={0} />
      <AnimatedDot index={1} />
      <AnimatedDot index={2} />
    </DotContainer>
  </StyledLoader>
);
