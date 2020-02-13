// @flow

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { containerPadding } from '_constants';
import { selectors as eventSelectors } from '_state/event';
import { selectors as eventInventorySelectors } from '_state/eventInventory';
import {
  actions as eventInventoryBulkActions,
  selectors as eventInventoryBulkSelectors,
} from '_state/eventInventoryBulk';
import type { EDEvent } from '_models';
import {
  PageWrapper,
  Spacing,
  Box,
  Flex,
  FlexItem,
  PrimaryButton,
} from '_components';
import { VirtualizedEventInventory } from './components/InventoryTable';
import { EventInventorySeatMap } from './components/InventorySeatMap';
import { BulkUpdateModal } from './components/BulkUpdateModal';
import { DashboardHeader } from '../components/DashboardHeader';

const EventInventoryTableContainer = styled(FlexItem)`
  min-height: 60%;
  min-width: 1100px;
`;

type Props = {
  event: ?EDEvent,
  selectedEventIds: number[],
  isBulkUpdating: boolean,
  startBulkUpdate: () => void,
};

export const EventInventory = ({
  event,
  selectedEventIds,
  isBulkUpdating,
  startBulkUpdate,
}: Props) =>
  !!event && (
    <PageWrapper>
      <Flex direction="column" height="100%">
        <Box padding={`${containerPadding}px`}>
          <DashboardHeader />
          <Box marginTop="1rem">
            <EventInventorySeatMap />
          </Box>
        </Box>
        <Spacing height="2rem" />
        <Box padding="0 1rem">
          <PrimaryButton
            disabled={!selectedEventIds.length}
            title="Update Selected Items"
            onClick={startBulkUpdate}
            small
          >
            Bulk Update ({selectedEventIds.length} Rows)
          </PrimaryButton>
        </Box>
        <EventInventoryTableContainer>
          <VirtualizedEventInventory event={event} />
        </EventInventoryTableContainer>
      </Flex>
      {isBulkUpdating && (
        <BulkUpdateModal selectedEventIds={selectedEventIds} />
      )}
    </PageWrapper>
  );

const mapStateToProps = createStructuredSelector({
  event: eventSelectors.selectEvent,
  selectedEventIds: eventInventorySelectors.selectSelectedRowIds,
  isBulkUpdating: eventInventoryBulkSelectors.isBulkUpdating,
});

const mapDispatchToProps = {
  startBulkUpdate: eventInventoryBulkActions.startBulkUpdate,
  cancelBulkUpdate: eventInventoryBulkActions.cancelBulkUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventInventory);
