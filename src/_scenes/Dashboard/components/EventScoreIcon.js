import React from 'react';
import styled from 'styled-components';

import { cssConstants } from '_constants';

const TicketBackground = styled.div`
  background-color: ${cssConstants.PRIMARY_BLUE};
  padding: 4px 12px; /* numbers chosen visually to make a ticket shape */
  border-radius: 3px;
  position: relative;
  display: inline-block;
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
    background-color: ${cssConstants.PRIMARY_DARK_GRAY};

    &:before,
    &:after {
      background-color: ${cssConstants.PRIMARY_LIGHTER_GRAY};
    }
  `}

  ${({ active }) =>
    active &&
    `
    background-color: white;
    color: ${cssConstants.PRIMARY_BLUE};

    &:before,
    &:after {
      background-color: ${cssConstants.PRIMARY_BLUE};
    }
  `}
`;

export const EventScoreIcon = ({ eventScore, past, active }) => (
  <TicketBackground past={past} active={active}>
    {eventScore}
  </TicketBackground>
);
