import React from 'react';
import styled from 'styled-components';
import { cssConstants } from '../../_constants';
import { isPast } from 'date-fns';
import { darken } from 'polished';

import {
  Flex,
  Spacing,
  H4,
  P2
} from '../../_components';

import {
  readableDuration,
  readableDate,
  orDash
} from '../../_helpers/stringUtils';

const Heading = H4.extend`
  margin: 0;
  padding: 0;
`;

const Container = styled.div`
  padding: 16px 32px 16px 40px;
  border-bottom: 1px solid ${cssConstants.PRIMARY_LIGHT_GRAY};
  background-color: ${(props) => { return props.past ? cssConstants.PRIMARY_LIGHTER_GRAY : cssConstants.PRIMARY_WHITE; }};
  color: ${(props) => { return props.past ? cssConstants.PRIMARY_DARK_GRAY : cssConstants.PRIMARY_BLACK; }};
  transition: 0.15s ease-in-out all;
  position: relative;

  :hover {
    cursor: pointer;
    background-color: ${(props) => darken(0.05, (props.past ? cssConstants.PRIMARY_LIGHTER_GRAY : cssConstants.PRIMARY_WHITE))};
  }

  ::before {
    transition: 0.1s ease-in-out width;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: ${(props) => { return props.active ? '16px' : '0px'; }};
    background-color: ${cssConstants.PRIMARY_DARK_BLUE};
  }
`;

export const EventListItem = (props) => {
  const { event, active, onClick } = props;

  return (
    <Container onClick={onClick} active={active} past={isPast(event.timestamp)}>
      <Flex direction="row" justify="space-between">
        <P2 color={cssConstants.PRIMARY_GRAY}>GAME SCORE: {orDash(event.score)}</P2>
        <P2 color={cssConstants.PRIMARY_GRAY}>updated {readableDuration(event.modifiedAt)} ago</P2>
      </Flex>
      <Spacing height="20px" />
      <Heading>{event.name}</Heading>
      <Spacing height="8px" />
      <Flex direction="row" justify="space-between">
        <P2>{readableDate(event.timestamp)}</P2>
        <P2>QUANTITY: {orDash(event.inventory)}/{orDash(event.capacity)}</P2>
      </Flex>
    </Container>
  );
};

EventListItem.defaultProps = {
  onClick: () => {},
  event: {},
  active: false
};
