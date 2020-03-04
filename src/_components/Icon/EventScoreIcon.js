import React from 'react';
import styled from 'styled-components';

import { colors } from '_constants';

const Background = styled.div`
  background-color: ${colors.blue};
  padding: 4px 12px; /* numbers chosen visually to make a ticket shape */
  border-radius: 3px;
  position: relative;
  display: inline-block;
  margin-bottom: 2px;

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
`;

const Text = styled.div`
  color: white;
`;

export const EventScoreIcon = ({ eventScore }) => (
  <Background>
    <Text>{eventScore}</Text>
  </Background>
);
