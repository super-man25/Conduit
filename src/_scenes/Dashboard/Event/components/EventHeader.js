// @flow

import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { isAfter } from 'date-fns';

import { cssConstants } from '_constants';
import {
  formatNumber,
  formatUSD,
  readableDateAndTime,
  isMobileDevice
} from '_helpers';
import { EDEvent } from '_models';
import { selectors } from '_state/event';
import { useSidebar } from '_hooks';
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

const EventDetails = styled.div``;

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
  pathname: string
};

export function EventHeader(props: Props) {
  const [isSidebarOpen, toggleSidebar] = useSidebar();

  const { event, pathname } = props;
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
        {!isSidebarOpen && !isMobileDevice && (
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
        <Flex>
          <EventDetails>
            <Text size="16" textAlign="right">
              Inventory
            </Text>
            <Text size="22" weight="heavy" textAlign="right">
              {inventoryString}
            </Text>
            <Text color={cssConstants.PRIMARY_BLUE} textAlign="right" size="12">
              Unsold / Sold
            </Text>
          </EventDetails>
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

export default connect(mapStateToProps)(EventHeader);
