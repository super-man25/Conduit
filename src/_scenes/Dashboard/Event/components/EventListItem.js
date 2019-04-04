// @flow

import { cssConstants } from '_constants';
import { darken } from 'polished';
import { Flex, FlexItem, H4, P1, Spacing, Text } from '_components';
import { isPast } from 'date-fns';
import { readableDate, readableDuration } from '_helpers/string-utils';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import type { EDEvent } from '_models';
import { formatNumber } from '_helpers/string-utils';

const Heading = H4.extend`
  margin: 0;
  padding: 0;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Container = styled.div`
  display: box;
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
    transition: 0.3s ease-out transform;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 14px;
    transform: scaleX(${(props) => (props.active ? 1 : 0)});
    transform-origin: left;
    background-color: ${cssConstants.PRIMARY_DARK_BLUE};
  }
`;

type Props = {
  event: EDEvent,
  active: boolean,
  onClick: (event: EDEvent) => void,
  isAdmin: boolean
};

export class EventListItem extends React.PureComponent<Props> {
  calculateEventScore = (event: EDEvent) => {
    const { eventScore, eventScoreModifier } = event;
    const result = parseFloat(eventScore || 0) + parseFloat(eventScoreModifier);
    return result.toFixed(3);
  };

  calculateSpring = (event: EDEvent) => {
    const { spring, springModifier } = event;
    const result = parseFloat(spring || 0) + parseFloat(springModifier);
    return result.toFixed(2);
  };

  render() {
    const { event, active, onClick, isAdmin } = this.props;
    const past = isPast(event.timestamp);
    return (
      <Container
        onClick={() => onClick(event)}
        active={active}
        past={past}
        data-test-id="event-list-card"
      >
        <Flex direction="column" flex={1}>
          <Flex direction="row" justify="space-between" align="center">
            <Heading title={event.name}>{event.name}</Heading>
            {isAdmin && (
              <Text size={12}>
                Event Score: {this.calculateEventScore(event)}
              </Text>
            )}
          </Flex>
          <Spacing height="12px" />
          {isAdmin ? (
            <Fragment>
              <Flex direction="row" justify="space-between">
                <P1 size="small">{readableDate(event.timestamp)}</P1>
                <Text size={12}>Spring: {this.calculateSpring(event)}%</Text>
              </Flex>
              <FlexItem>
                <P1 size="small">
                  {formatNumber(event.unsoldInventory)} Unsold
                </P1>
              </FlexItem>
            </Fragment>
          ) : (
            <Flex direction="row" justify="space-between">
              <P1 size="small">{readableDate(event.timestamp)}</P1>
              <P1 size="small">{formatNumber(event.unsoldInventory)} Unsold</P1>
            </Flex>
          )}
        </Flex>
      </Container>
    );
  }
}
