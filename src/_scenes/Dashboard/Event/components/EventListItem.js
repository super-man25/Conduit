import { cssConstants } from '_constants';
import { darken } from 'polished';
import { Event as EventModel } from '_models';
import { Flex, FlexItem, H4, Icon, P2, Spacing } from '_components';
import { isPast } from 'date-fns';
import { orDash, readableDate, readableDuration } from '_helpers/string-utils';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Heading = H4.extend`
  margin: 0;
  padding: 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px 16px 16px 40px;
  border-bottom: 1px solid ${cssConstants.PRIMARY_LIGHT_GRAY};
  background-color: ${(props) => {
    return props.past
      ? cssConstants.PRIMARY_LIGHTER_GRAY
      : cssConstants.PRIMARY_WHITE;
  }};
  color: ${(props) => {
    return props.past
      ? cssConstants.PRIMARY_DARK_GRAY
      : cssConstants.PRIMARY_BLACK;
  }};
  transition: 0.15s ease-in-out all;
  position: relative;

  :hover {
    cursor: pointer;
    background-color: ${(props) =>
      darken(
        0.05,
        props.past
          ? cssConstants.PRIMARY_LIGHTER_GRAY
          : cssConstants.PRIMARY_WHITE
      )};
  }

  ::before {
    transition: 0.1s ease-in-out width;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: ${(props) => {
      return props.active ? '16px' : '0px';
    }};
    background-color: ${cssConstants.PRIMARY_DARK_BLUE};
  }
`;

export const EventListItem = (props) => {
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
          <P2 color={cssConstants.PRIMARY_GRAY}>
            GAME SCORE: {orDash(event.score)}
          </P2>
          <P2 color={cssConstants.PRIMARY_GRAY}>
            updated {readableDuration(event.modifiedAt)} ago
          </P2>
        </Flex>
        <Spacing height="16px" />
        <Heading>{event.name}</Heading>
        <Spacing height="8px" />
        <Flex direction="row" justify="space-between">
          <P2>{readableDate(event.timestamp)}</P2>
          <P2>
            QUANTITY: {orDash(event.inventory)}/{orDash(event.capacity)}
          </P2>
        </Flex>
      </FlexItem>
      <Spacing width="16px" />
      <Spacing width="60px">
        {!!event.promotion && (
          <Flex direction="column" align="center">
            <P2 color={cssConstants.PRIMARY_GRAY}>promotion</P2>
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

EventListItem.propTypes = {
  /** An event object */
  event: EventModel.isRequired,

  /** Whether or not the current list item is active. Defaults to false. */
  active: PropTypes.bool,

  /** Callback fired when a list item is clicked. Passed the event. */
  onClick: PropTypes.func
};
