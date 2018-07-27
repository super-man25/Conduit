// @flow
import React from 'react';
import {
  PageWrapper,
  Spacing,
  Box,
  Flex,
  FlexItem,
  GrayButton
} from '_components';
import { connect } from 'react-redux';
import EventHeader from '../../components/EventHeader';
import { selectors as eventSelectors } from '_state/event';
import { selectors as eventInventorySelectors } from '_state/eventInventory';
import {
  actions as eventInventoryBulkActions,
  selectors as eventInventoryBulkSelectors
} from '_state/eventInventoryBulk';
import { VirtualizedEventInventory } from './components/InventoryTable';
import type { EDEvent } from '_models';
import { Portal } from '_components/Portal';
import { BulkUpdateModal } from './components/BulkUpdateModal';
import { createStructuredSelector } from 'reselect';

type Props = {
  event: ?EDEvent,
  selectedEventIds: number[],
  isBulkUpdating: boolean,
  startBulkUpdate: () => void
};

export const EventInventory = ({
  event,
  selectedEventIds,
  isBulkUpdating,
  startBulkUpdate
}: Props) =>
  !!event && (
    <PageWrapper>
      <Flex direction="column" height="100%">
        <Box padding="1.5rem 2rem">
          <EventHeader availableInventory={15000} totalInventory={40000} />
        </Box>
        <Spacing height="2rem" />
        <Box padding="0 1rem">
          <GrayButton
            disabled={!selectedEventIds.length}
            title="Update Selected Items"
            onClick={startBulkUpdate}
            small
          >
            Bulk Update ({selectedEventIds.length} Rows)
          </GrayButton>
        </Box>
        <FlexItem>
          <VirtualizedEventInventory event={event} />
        </FlexItem>
      </Flex>
      <Portal>
        {isBulkUpdating && (
          <BulkUpdateModal selectedEventIds={selectedEventIds} />
        )}
      </Portal>
    </PageWrapper>
  );

const mapStateToProps = createStructuredSelector({
  event: eventSelectors.selectEvent,
  selectedEventIds: eventInventorySelectors.selectSelectedRowIds,
  isBulkUpdating: eventInventoryBulkSelectors.isBulkUpdating
});

const mapDispatchToProps = {
  startBulkUpdate: eventInventoryBulkActions.startBulkUpdate,
  cancelBulkUpdate: eventInventoryBulkActions.cancelBulkUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(EventInventory);