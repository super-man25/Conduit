import React from 'react';
import styled from 'styled-components';
import { darken, lighten } from 'polished';
import { cssConstants } from '../_constants';

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

export const SortableLabel = (props) => {
  const {
    children,
    direction,
    onClick
  } = props;

  return (
    <Container>
      <Flex direction="row">
        <Label onClick={() => onClick(direction, nextDirection(direction))}>{children}</Label>
        <IconContainer>
          <Abs top="-6px">
            <Icon
              name="arrow-drop-up"
              size={24}
              color={direction === 'desc' ? ARROW_COLOR : lighten(0.5, ARROW_COLOR)}
            />
          </Abs>
          <Abs top="1px">
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

SortableLabel.defaultProps = {
  onClick: () => {},
  direction: 'indeterminate'
};
