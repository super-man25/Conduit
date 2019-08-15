// @flow

import styled from 'styled-components';
import * as React from 'react';
import {
  H1,
  H4,
  Flex,
  FlexItem,
  EDLink,
  S1,
  TextButton,
  Icon,
  Breadcrumbs,
  Spacing,
  Box,
  Text
} from '_components';
import { cssConstants } from '_constants';
import { readableDateAndTime } from '_helpers/string-utils';
import { EDEvent } from '_models';
import { formatNumber, formatUSD } from '_helpers/string-utils';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withSidebar } from '_hoc';
import { selectors } from '_state/event';
import { isAfter } from 'date-fns';

const EventTitle = styled(H1)`
  margin: 0;
  margin-bottom: 0.15rem;
`;

const EventDate = styled(H4)`
  margin: 0;
  margin-bottom: 0.5rem;
  letter-spacing: -0.2px;
`;

const InventoryLink = styled(S1)`
  color: ${cssConstants.SECONDARY_BLUE};
  text-decoration: underline;
  font-weight: bold;
  letter-spacing: 0.5px;
`;

const createCrumbs = (event: EDEvent, isViewingInventory: boolean) => {
  const crumbs = [
    { title: 'Season Dashboard', path: '/season' },
    { title: event.name, path: `/event/${event.id}` }
  ];

  if (isViewingInventory) {
    crumbs.push({ title: 'Inventory', path: `/event/${event.id}/inventory` });
  }

  return crumbs;
};

type Props = {
  event: EDEvent,
  availableInventory: number,
  totalInventory: number,
  toggleSidebar: () => void,
  isSidebarOpen: boolean,
  pathname: string
};

export function EventHeader(props: Props) {
  const { event, toggleSidebar, isSidebarOpen, pathname } = props;
  const { timestamp, name, id, timeZone } = event;
  const isViewingInventory = pathname.split('/').includes('inventory');
  const sold = formatNumber(event.soldInventory);
  const unsold = formatNumber(event.unsoldInventory);
  const revenue = formatUSD(event.revenue, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  const inventoryString = `${unsold} / ${sold}`;
  const showInventoryLink = isAfter(timestamp, new Date());

  return (
    <Box>
      <Flex align="center">
        {!isSidebarOpen && (
          <TextButton
            onClick={toggleSidebar}
            padding="0"
            textAlign="left"
            minWidth="60px"
          >
            <Icon
              name="arrow-right"
              size={48}
              color={cssConstants.PRIMARY_BLUE}
            />
          </TextButton>
        )}
        <Breadcrumbs crumbs={createCrumbs(event, isViewingInventory)} />
      </Flex>
      <Spacing height="1.5rem" />
      <Flex justify="space-between" align="flex-start">
        <FlexItem flex="1" margin="0 20px 0 0">
          <EventTitle>{name}</EventTitle>
          <EventDate>{readableDateAndTime(timestamp, timeZone)}</EventDate>
          {showInventoryLink && !isViewingInventory && (
            <EDLink to={`/event/${id}/inventory`}>
              <InventoryLink>SEE INVENTORY LIST</InventoryLink>
            </EDLink>
          )}
        </FlexItem>
        <Flex justify="flex-end">
          <FlexItem flex="0 0 auto" margin="0 25px">
            <Text size="16" textAlign="right">
              Inventory
            </Text>
            <Text size="22" weight="heavy" textAlign="right">
              {inventoryString}
            </Text>
            <Text color={cssConstants.PRIMARY_BLUE} textAlign="right" size="12">
              Unsold / Sold
            </Text>
          </FlexItem>
        </Flex>
        <FlexItem flex="0 0 auto" margin="0 25px">
          <Text size="16" textAlign="right">
            Revenue
          </Text>
          <Text size="22" weight="heavy" textAlign="right">
            {revenue}
          </Text>
          <Text color={cssConstants.PRIMARY_BLUE} textAlign="right" size="12">
            as of date
          </Text>
        </FlexItem>
      </Flex>
    </Box>
  );
}

function mapStateToProps(state) {
  return {
    event: selectors.selectEvent(state),
    pathname: state.router.location.pathname
  };
}

export default compose(
  connect(mapStateToProps),
  withSidebar
)(EventHeader);
