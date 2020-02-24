// @flow

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { containerPadding } from '_constants';
import {
  actions as eventActions,
  selectors as eventSelectors,
} from '_state/event';
import { selectors as eventInventorySelectors } from '_state/eventInventory';
import {
  actions as eventInventoryBulkActions,
  selectors as eventInventoryBulkSelectors,
} from '_state/eventInventoryBulk';
import {
  PageWrapper,
  Spacing,
  Box,
  Flex,
  FlexItem,
  PrimaryButton,
  Loader,
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
  match: any,
};

export const EventInventory = ({ match }: Props) => {
  const dispatch = useDispatch();
  const startBulkUpdate = () =>
    dispatch(eventInventoryBulkActions.startBulkUpdate());
  const event = useSelector(eventSelectors.selectEvent);
  const selectedEventIds = useSelector(
    eventInventorySelectors.selectSelectedRowIds
  );
  const isBulkUpdating = useSelector(
    eventInventoryBulkSelectors.isBulkUpdating
  );

  useEffect(() => {
    if (event) return;
    const { id } = match.params;
    const fetchEvent = () => dispatch(eventActions.fetchEvent(id));
    fetchEvent();
  }, [dispatch, event, match]);

  return event ? (
    <PageWrapper>
      <Flex direction="column" height="100%">
        <Box padding={`${containerPadding}px`}>
          <DashboardHeader isEventInventory={true} />
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
  ) : (
    <Loader centered />
  );
};
