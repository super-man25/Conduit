import React from 'react';
import styled from 'styled-components';

import { colors } from '_constants';
import { Icon } from '_components';

const TicketBackground = styled.div`
  background-color: ${colors.blue};
  padding: 4px 12px; /* numbers chosen visually to make a ticket shape */
  border-radius: 3px;
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-bottom: 2px;
  color: white;
  text-align: center;
  font-weight: bold;

  &:before,
  &:after {
    content: '';
    width: 8px;
    height: 8px;
    background-color: white;
    border-radius: 5px;
    position: absolute;
    top: calc(50% - 4px);
  }

  &:before {
    right: calc(100% - 4px);
  }

  &:after {
    left: calc(100% - 4px);
  }

  ${({ past }) =>
    past &&
    `
    background-color: ${colors.gray};

    &:before,
    &:after {
      background-color: ${colors.lightGray};
    }
  `}

  ${({ active }) =>
    active &&
    `
    background-color: white;
    color: ${colors.blue};

    &:before,
    &:after {
      background-color: ${colors.blue};
    }
  `}
`;

const EventScoreTrendIndicator = styled(Icon)`
  margin-left: 5px;
`;

export const EventScoreIcon = ({
  eventScore,
  eventScoreTrend,
  past,
  active,
}) => (
  <TicketBackground past={past} active={active}>
    {eventScore}
    {eventScoreTrend !== null && (
      <EventScoreTrendIndicator
        size={8}
        name={eventScoreTrend ? 'arrowUp' : 'arrowDown'}
        color={active ? colors.blue : colors.white}
      />
    )}
  </TicketBackground>
);
