import React from 'react';
import styled from 'styled-components';
import { cssConstants } from '../../_constants';

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
`;

export const EventListItem = (props) => {
  const { event } = props;

  return (
    <Container>
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
