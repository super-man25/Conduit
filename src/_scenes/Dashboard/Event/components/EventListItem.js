// @flow

import { cssConstants } from '_constants';
import { darken } from 'polished';
import { Spacing, Flex, FlexItem, H4, P1, StatusIndicator } from '_components';
import { isPast } from 'date-fns';
import React from 'react';
import styled from 'styled-components';
import type { EDEvent, EDScheduledJob } from '_models';
import {
  formatNumber,
  readableDate,
  readableTimeOrDate
} from '_helpers/string-utils';
import get from 'lodash.get';

const Heading = H4.extend`
  margin: 0 0 2px 0;
  padding: 0;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${cssConstants.PRIMARY_DARKEST_GRAY};
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

const ItalicP1 = P1.extend`
  font-style: italic;
`;

const I = styled.span`
  font-style: italic;
`;

type Props = {
  event: EDEvent,
  active: boolean,
  onClick: (event: EDEvent) => void,
  isAdmin: boolean
};

const ScheduledJobStatusIndicator = ({
  scheduledJob
}: {
  scheduledJob: EDScheduledJob
}) => {
  const { status, modifiedAt } = scheduledJob;

  const map = {
    Pending: {
      status: 'warn'
    },
    Success: {
      status: 'success'
    },
    Failure: {
      status: 'error'
    },
    Running: {
      status: 'success',
      blink: true
    }
  };

  const args = map[status];

  return (
    <StatusIndicator
      {...args}
      title={`${readableDate(modifiedAt)} - ${status}`}
      text={readableTimeOrDate(modifiedAt)}
    />
  );
};

export class EventListItem extends React.PureComponent<Props> {
  calculateEventScore = (event: EDEvent) => {
    const { eventScore, eventScoreModifier } = event;
    if (eventScore === undefined) {
      return '--';
    }

    return (eventScore + eventScoreModifier).toFixed(2);
  };

  calculateSpring = (event: EDEvent) => {
    const { spring, springModifier } = event;
    if (spring === undefined) {
      return '--';
    }

    return `${(spring + springModifier).toFixed(4)}%`;
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
        <Flex direction="column" flex={1} style={{ overflow: 'hidden' }}>
          <Heading title={event.name}>{event.name}</Heading>
          <ItalicP1 color={cssConstants.PRIMARY_DARK_GRAY} size="small" italic>
            {readableDate(event.timestamp)}
          </ItalicP1>
          <Spacing padding="18px 0 0 0 ">
            <P1 color={cssConstants.PRIMARY_DARKEST_GRAY}>
              {formatNumber(event.unsoldInventory)} /{' '}
              {formatNumber(event.totalInventory)}
            </P1>
            <P1 size="small" color={cssConstants.PRIMARY_DARKEST_GRAY}>
              <I>Unsold</I>
              {' / '}
              <I>Total</I>
            </P1>
          </Spacing>
        </Flex>
        <Flex direction="column" align="flex-end" justify="space-between">
          <FlexItem flex={1} padding="2px 0 0 0">
            {event.scheduledJob && (
              <ScheduledJobStatusIndicator scheduledJob={event.scheduledJob} />
            )}
          </FlexItem>
          <P1 color={cssConstants.PRIMARY_DARKEST_GRAY}>
            {this.calculateEventScore(event)}
            {isAdmin && ` / ${this.calculateSpring(event)}`}
          </P1>
          <P1 size="small" color={cssConstants.PRIMARY_DARKEST_GRAY}>
            <I>Score</I>
            {isAdmin && (
              <>
                {' / '}
                <I>Spring</I>
              </>
            )}
          </P1>
        </Flex>
      </Container>
    );
  }
}
