import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { cssConstants } from '../_constants';
import PropTypes from 'prop-types';

const SIZE_LARGE = '14px';
const SIZE_SMALL = '10px';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: 68px;
  height: ${SIZE_LARGE};
  aligh-self: center;

  ${(props) => props.small && css`
    height: ${SIZE_SMALL};
    width: 46px;
  `}
`;

const dotAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  60% {
    opacity: 0;
  }
`;

const Dot = styled.div`
  height: ${SIZE_LARGE};
  width: ${SIZE_LARGE};
  border-radius: ${SIZE_LARGE};
  background-color: ${(props) => props.color || cssConstants.PRIMARY_LIGHT_BLUE};
  animation: ${dotAnimation} 1.3s ease infinite;
  animation-delay: ${(props) => `${0.1 + props.index * 0.2}s`};

  ${(props) => props.small && css`
    height: ${SIZE_SMALL};
    width: ${SIZE_SMALL};
    border-radiusd: ${SIZE_SMALL};
  `}
`;

export const Loader = (props) => (
  <Wrapper {...props} >
    <Dot index={0} {...props} />
    <Dot index={1} {...props} />
    <Dot index={2} {...props} />
  </Wrapper>
);

Loader.propTypes = {
  /** Modify the loader to make it small */
  small: PropTypes.bool,

  /** HTML color (HEX or color string) for the loader */
  color: PropTypes.string
};
