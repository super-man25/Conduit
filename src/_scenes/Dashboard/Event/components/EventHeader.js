// @flow

import styled from 'styled-components';
import * as React from 'react';
import {
  H1,
  H4,
  Flex,
  FlexItem,
  EDLink,
  P1,
  S1,
  Button,
  Breadcrumbs,
  Spacing,
  Box
} from '_components';
import { cssConstants } from '_constants';
import { readableDateAndTime } from '_helpers/string-utils';
import { EDEvent } from '_models';
import { formatNumber, formatUSD } from '_helpers/string-utils';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withSidebar } from '_hoc';
import { selectors } from '_state/event';

const ToggleButton = styled(Button)`
  margin: 0;
  margin-right: 1rem;
`;

const EventTitle = styled(H1)`
  margin: 0;
  margin-bottom: 0.15rem;
`;

const EventDate = styled(H4)`
  color: ${cssConstants.SECONDARY_BLUE};
  margin: 0;
  margin-bottom: 0.15rem;
`;

const InventoryLink = styled(S1)`
  color: ${cssConstants.PRIMARY_LIGHT_BLUE};
  text-decoration: underline;
`;

const RightP1 = styled(P1)`
  text-align: right;
`;

const ItalicS1 = styled(S1)`
  font-style: italic;
  display: block;
  text-align: ${(props) => props.align};
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

  return (
    <Box>
      <Flex align="center">
        {!isSidebarOpen && (
          <ToggleButton small expand onClick={toggleSidebar} />
        )}
        <Breadcrumbs crumbs={createCrumbs(event, isViewingInventory)} />
      </Flex>
      <Spacing height="1.5rem" />
      <Flex justify="space-between" align="flex-start">
        <FlexItem flex="1" margin="0 20px 0 0">
          <EventTitle>{name}</EventTitle>
          <EventDate>{readableDateAndTime(timestamp, timeZone)}</EventDate>
          {!isViewingInventory && (
            <EDLink to={`/event/${id}/inventory`}>
              <InventoryLink color={cssConstants.PRIMARY_LIGHT_BLUE}>
                See Inventory List
              </InventoryLink>
            </EDLink>
          )}
        </FlexItem>
        <Flex justify="flex-end">
          <FlexItem flex="0 0 auto" margin="0 25px">
            <RightP1 size="16px">Inventory</RightP1>
            <RightP1 size="22px" color={cssConstants.SECONDARY_BLUE}>
              {inventoryString}
            </RightP1>
            <ItalicS1 color={cssConstants.SECONDARY_BLUE} align="right">
              Unsold / Sold
            </ItalicS1>
          </FlexItem>
        </Flex>
        <FlexItem flex="0 0 auto" margin="0 25px">
          <RightP1 size="16px">Revenue</RightP1>
          <RightP1 size="22px" color={cssConstants.SECONDARY_BLUE}>
            {revenue}
          </RightP1>
          <ItalicS1 color={cssConstants.SECONDARY_BLUE} align="right">
            to date
          </ItalicS1>
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
