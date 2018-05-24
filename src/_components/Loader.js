import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { cssConstants } from '_constants';
import PropTypes from 'prop-types';

const LARGE_HEIGHT = '14px';
const SMALL_HEIGHT = '10px';
const LARGE_WIDTH = '68px';
const SMALL_WIDTH = '46px';

const Wrapper = styled.div.attrs({
  height: (props) => (props.small ? SMALL_HEIGHT : LARGE_HEIGHT),
  width: (props) => (props.small ? SMALL_WIDTH : LARGE_WIDTH)
})`
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  align-self: center;
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
  height: ${LARGE_HEIGHT};
  width: ${LARGE_HEIGHT};
  border-radius: ${LARGE_HEIGHT};
  background-color: ${(props) =>
    props.color || cssConstants.PRIMARY_LIGHT_BLUE};
  animation: ${dotAnimation} 1.3s ease infinite;
  animation-delay: ${(props) => `${0.1 + props.index * 0.2}s`};

  ${(props) =>
    props.small &&
    css`
      height: ${SMALL_HEIGHT};
      width: ${SMALL_HEIGHT};
      border-radiusd: ${SMALL_HEIGHT};
    `};
`;

export const Loader = (props) => (
  <Wrapper {...props}>
    <Dot index={0} {...props} />
    <Dot index={1} {...props} />
    <Dot index={2} {...props} />
  </Wrapper>
);

Loader.propTypes = {
  small: PropTypes.bool,
  color: PropTypes.string
};
