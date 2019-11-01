// @flow

import { cssConstants, containerPadding } from '_constants';
import { darken } from 'polished';
import { Flex, FlexItem, H4, P1 } from '_components';
import React from 'react';
import styled, { css } from 'styled-components';
import type { EDEvent } from '_models';
import {
  formatNumber,
  formatUSD,
  readableDateAndTime,
  isPastEvent,
  finalEventScore,
  finalSpringValue
} from '_helpers';
import { ScheduledJobStatus } from './ScheduledJobStatus';

const Heading = styled(H4)`
  margin: 2px 0 20px 0;
  padding: 0;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 600;
  color: ${(props) =>
    props.past
      ? cssConstants.PRIMARY_DARK_GRAY
      : cssConstants.PRIMARY_DARKEST_GRAY};
`;
const SubHeading = styled(P1)`
  margin: 2px 0 0 0;
  font-size: 12px;
  color: ${(props) =>
    props.past
      ? cssConstants.PRIMARY_DARK_GRAY
      : cssConstants.PRIMARY_DARKEST_GRAY};
  text-transform: uppercase;
`;

const boxShadow = (props) =>
  props.active &&
  css`
    box-shadow: 0px 6px 8px ${cssConstants.PRIMARY_LIGHT_GRAY};
    z-index: 999;
  `;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px ${containerPadding}px;
  border-bottom: 1px solid ${cssConstants.PRIMARY_LIGHT_GRAY};
  background-color: ${(props) =>
    props.past
      ? cssConstants.PRIMARY_LIGHTER_GRAY
      : cssConstants.PRIMARY_WHITE};
  color: ${(props) =>
    props.past ? cssConstants.PRIMARY_DARK_GRAY : cssConstants.PRIMARY_BLACK};
  transition: 0.15s ease-in-out all;
  position: relative;
  ${boxShadow};

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
    right: 0;
    height: 10px;
    transform: scaleY(${(props) => (props.active ? 1 : 0)});
    transform-origin: top;
    background-color: ${cssConstants.PRIMARY_BLUE};
  }
`;

const EventDetailsLabel = styled(P1)`
  color: ${(props) =>
    props.past
      ? cssConstants.PRIMARY_DARK_GRAY
      : cssConstants.PRIMARY_DARKEST_GRAY};
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 2px 0;
`;

const SubtextP1 = styled(P1)`
  color: ${(props) =>
    props.past
      ? cssConstants.PRIMARY_DARK_GRAY
      : cssConstants.PRIMARY_DARKEST_GRAY};
  font-size: 14px;
`;

const EventDetails = ({
  flex,
  isPast,
  title,
  text
}: {
  flex: number,
  isPast: boolean,
  title: string,
  text: string
}) => {
  return (
    <FlexItem flex={flex} padding="2px 3px 0 3px" alignSelf="flex-end">
      <EventDetailsLabel past={isPast}>{title}</EventDetailsLabel>
      <SubtextP1 past={isPast}>{text}</SubtextP1>
    </FlexItem>
  );
};

type Props = {
  event: EDEvent,
  active: boolean,
  onClick: (event: EDEvent) => void,
  isAdmin: boolean
};

export class EventListItem extends React.PureComponent<Props> {
  calculateEventScore = (event: EDEvent) => {
    const { eventScore, eventScoreModifier, velocityFactor } = event.factors;
    if (eventScore === undefined) {
      return '--';
    }

    return finalEventScore(eventScore, velocityFactor, eventScoreModifier);
  };

  calculateSpring = (event: EDEvent) => {
    const { spring, springModifier } = event.factors;
    if (spring === undefined) {
      return '--';
    }

    return `${finalSpringValue(spring, springModifier, 2)}%`;
  };

  render() {
    const { event, active, onClick, isAdmin } = this.props;
    const past = isPastEvent(event);
    return (
      <Container
        onClick={() => onClick(event)}
        active={active}
        past={past}
        data-test-id="event-list-card"
      >
        <Flex direction="column" flex={1} style={{ overflow: 'hidden' }}>
          <Heading past={past} title={event.name}>
            {event.name}
            <SubHeading past={past}>
              {readableDateAndTime(event.timestamp, event.timeZone)}
            </SubHeading>
          </Heading>
          <Flex direction="row" flex={1}>
            <EventDetails
              flex={4}
              isPast={past}
              title={
                formatNumber(event.unsoldInventory) +
                ' / ' +
                formatNumber(event.soldInventory)
              }
              text="Unsold / Sold"
            />
            <EventDetails
              flex={4}
              isPast={past}
              title={formatUSD(event.revenue, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              })}
              text="Revenue to Date"
            />
            <EventDetails
              flex={isAdmin ? 3 : 1}
              isPast={past}
              title={`${this.calculateEventScore(event)}
                ${isAdmin ? ` / ${this.calculateSpring(event)}` : ''}`}
              text={`Score${isAdmin ? ` / Spring` : ''}`}
            />
          </Flex>
          <FlexItem flex={1}>
            <ScheduledJobStatus
              past={past}
              scheduledJob={event.scheduledJob}
              timeZone={event.timeZone}
            />
          </FlexItem>
        </Flex>
      </Container>
    );
  }
}
