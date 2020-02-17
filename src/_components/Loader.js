import React from 'react';
import styled, { keyframes } from 'styled-components';
import { cssConstants } from '_constants';

const smallHeight = '10px';
const largeHeight = '14px';
const smallWidth = '45px';
const largeWidth = '75px';

const StyledLoader = styled.div`
  ${({ centered }) =>
    centered &&
    `
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`;

const DotContainer = styled.div`
  display: flex;
  width: ${({ small }) => (small ? smallWidth : largeWidth)};
  height: ${({ small }) => (small ? smallHeight : largeHeight)};
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
  width: ${({ small }) => (small ? smallWidth : largeWidth)};
  height: ${({ small }) => (small ? smallHeight : largeHeight)};
  border-radius: 100%;
  animation: ${dotAnimation} 1.3s ease infinite;
  animation-delay: ${(props) => `${0.1 + props.index * 0.2}s`};
`;

export const Loader = ({ small }) => (
  <StyledLoader>
    <DotContainer small={small}>
      <AnimatedDot index={0} />
      <AnimatedDot index={1} />
      <AnimatedDot index={2} />
    </DotContainer>
  </StyledLoader>
);
