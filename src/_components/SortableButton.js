// @flow
import * as React from 'react';
import styled from 'styled-components';

import { colors } from '_constants';
import { P1 } from './StyledTags';
import { Icon } from './Icon';
import { Flex } from './Flex';

const Container = styled.div`
  display: inline-block;
`;

const Label = styled(P1)`
  color: ${colors.blue};
  transition: 0.2s ease-in-out all;

  :hover {
    cursor: pointer;
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
    indeterminate: 'asc',
  };

  return steps[dir] || 'indeterminate';
};

type Props = {
  children: React.Node,
  direction: 'asc' | 'desc' | 'indeterminate',
  onClick: (prev: string, next: string) => void,
};

export const SortableButton = (props: Props) => {
  const { children, direction, onClick } = props;

  return (
    <Container>
      <Flex direction="row" align="center">
        <Label onClick={() => onClick(direction, nextDirection(direction))}>
          {children}
        </Label>
        <IconContainer>
          <Abs top="-2px">
            <Icon name="caretUp" size={24} color={colors.black} />
          </Abs>
          <Abs top="4px">
            <Icon name="caretDown" size={24} color={colors.black} />
          </Abs>
        </IconContainer>
      </Flex>
    </Container>
  );
};

SortableButton.defaultProps = {
  onClick: () => {},
  direction: 'indeterminate',
};
