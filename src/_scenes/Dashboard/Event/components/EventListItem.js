// @flow

import { cssConstants } from '_constants';
import { darken } from 'polished';
import { Flex, FlexItem, H4, Icon, P1, Spacing } from '_components';
import { isPast } from 'date-fns';
import { orDash, readableDate, readableDuration } from '_helpers/string-utils';
import React from 'react';
import styled from 'styled-components';
import type { EDEvent } from '_models';

const Heading = H4.extend`
  margin: 0;
  padding: 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px 16px 16px 40px;
  border-bottom: 1px solid ${cssConstants.PRIMARY_LIGHT_GRAY};
  background-color: ${(props) =>
    props.past
      ? cssConstants.PRIMARY_LIGHTER_GRAY
      : cssConstants.PRIMARY_WHITE};
  color: ${(props) =>
    props.past ? cssConstants.PRIMARY_DARK_GRAY : cssConstants.PRIMARY_BLACK};
  transition: 0.15s ease-in-out all;
  position: relative;

  :hover {
    cursor: pointer;
    background-color: ${(props) =>
      darken(
        0.02,
        props.past
          ? cssConstants.PRIMARY_LIGHTER_GRAY
          : cssConstants.PRIMARY_WHITE
      )};
  }

  ::before {
    transition: 0.3s ease-in-out width;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: ${(props) => {
      return props.active ? '14px' : '0px';
    }};
    background-color: ${cssConstants.PRIMARY_DARK_BLUE};
  }
`;

type Props = {
  event: EDEvent,
  active: boolean,
  onClick: (event: EDEvent) => void
};

export const EventListItem = (props: Props) => {
  const { event, active, onClick } = props;
  const past = isPast(event.timestamp);

  return (
    <Container
      onClick={() => onClick(event)}
      active={active}
      past={past}
      data-test-id="event-list-card"
    >
      <FlexItem flex={4}>
        <Flex direction="row" justify="space-between">
          <P1 color={cssConstants.PRIMARY_GRAY} size="small">
            GAME SCORE: {orDash(event.score)}
          </P1>
          <P1 color={cssConstants.PRIMARY_GRAY} size="small">
            Updated {readableDuration(event.modifiedAt)} ago
          </P1>
        </Flex>
        <Spacing height="16px" />
        <Heading>{event.name}</Heading>
        <Spacing height="8px" />
        <Flex direction="row" justify="space-between">
          <P1 size="small">{readableDate(event.timestamp)}</P1>
          <P1 size="small">
            QUANTITY: {orDash(event.inventory)}/{orDash(event.capacity)}
          </P1>
        </Flex>
      </FlexItem>
      <Spacing width="16px" />
      <Spacing width="60px">
        {!!event.promotion && (
          <Flex direction="column" align="center">
            <P1 color={cssConstants.PRIMARY_GRAY}>promotion</P1>
            <Spacing height="8px" />
            <Icon
              name="award"
              size={28}
              color={
                past
                  ? cssConstants.PRIMARY_DARK_GRAY
                  : cssConstants.PRIMARY_BLACK
              }
            />
          </Flex>
        )}
      </Spacing>
    </Container>
  );
};

EventListItem.defaultProps = {
  onClick: () => {},
  active: false
};
