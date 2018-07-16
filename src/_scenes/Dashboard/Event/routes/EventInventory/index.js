// @flow
import React from 'react';
import { PageWrapper, Spacing, Box, Flex, FlexItem } from '_components';
import { connect } from 'react-redux';
import EventHeader from '../../components/EventHeader';
import type { EDEvent } from '_models';
import { selectors } from '_state/event';
import { VirtualizedEventInventory } from './components/InventoryTable/VirtualizedInventoryTable';

type Props = {
  event: ?EDEvent
};

export const EventInventory = ({ event }: Props) =>
  !!event && (
    <PageWrapper>
      <Flex direction="column" height="100%">
        <Box padding="1.5rem 2rem">
          <EventHeader availableInventory={15000} totalInventory={40000} />
        </Box>
        <Spacing height="2rem" />
        <FlexItem>
          <VirtualizedEventInventory event={event} />
        </FlexItem>
      </Flex>
    </PageWrapper>
  );

function mapStateToProps(state) {
  return {
    event: selectors.selectEvent(state)
  };
}

export default connect(mapStateToProps)(EventInventory);
