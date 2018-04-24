import React from 'react';
import styled from 'styled-components';
import { darken, lighten } from 'polished';
import { cssConstants } from '../_constants';
import PropTypes from 'prop-types';

import { P1 } from './StyledTags';
import { Icon } from './Icon';
import { Flex } from './Flex';

const ARROW_COLOR = '#000';

const Container = styled.div`
  display: inline-block;
`;

const Label = P1.extend`
  color: ${cssConstants.PRIMARY_LIGHT_BLUE};
  transition: 0.2s ease-in-out all;

  :hover {
    cursor: pointer;
    color: ${darken(0.1, cssConstants.PRIMARY_LIGHT_BLUE)};
  }
`;

const IconContainer = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
`;

const Abs = styled.div`
  position: absolute;
  top: ${(props) => props.top};
`;

const nextDirection = (dir) => {
  const steps = {
    asc: 'desc',
    desc: 'indeterminate',
    indeterminate: 'asc'
  };

  return steps[dir] || 'indeterminate';
};

export const SortableButton = (props) => {
  const {
    children,
    direction,
    onClick
  } = props;

  return (
    <Container>
      <Flex direction="row" align="center">
        <Label onClick={() => onClick(direction, nextDirection(direction))}>{children}</Label>
        <IconContainer>
          <Abs top="-2px">
            <Icon
              name="arrow-drop-up"
              size={24}
              color={direction === 'desc' ? ARROW_COLOR : lighten(0.5, ARROW_COLOR)}
            />
          </Abs>
          <Abs top="4px">
            <Icon
              name="arrow-drop-down"
              size={24}
              color={direction === 'asc' ? ARROW_COLOR : lighten(0.5, ARROW_COLOR)}
            />
          </Abs>
        </IconContainer>
      </Flex>
    </Container>
  );
};

SortableButton.defaultProps = {
  onClick: () => {},
  direction: 'indeterminate'
};


SortableButton.propTypes = {
  /** Renderable label value for the button */
  children: PropTypes.node,

  /** The sort direction for the field correspending to the visual state of the arrows */
  direction: PropTypes.oneOf(['asc', 'desc', 'indeterminate']),

  /**
   * Callback fired when the button is clicked on. The function is passed the current direction
   * and the suggested next direction ("asc" -> "desc" -> "indeterminate" -> ...).
   */
  onClick: PropTypes.func
};
