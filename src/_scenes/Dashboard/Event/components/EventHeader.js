// @flow
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
import { format } from 'date-fns';
import { EDEvent } from '_models';
import { formatNumber, formatUSD } from '_helpers/string-utils';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withSidebar } from '_hoc';
import { selectors } from '_state/event';

const DATE_FORMAT = 'dddd, MMMM Do, YYYY @ h:mmA';

const ToggleButton = Button.extend`
  margin: 0;
  margin-right: 1rem;
`;

const EventTitle = H1.extend`
  margin: 0;
  margin-bottom: 0.15rem;
`;

const EventDate = H4.extend`
  color: ${cssConstants.SECONDARY_BLUE};
  margin: 0;
  margin-bottom: 0.15rem;
`;

const InventoryLink = S1.extend`
  color: ${cssConstants.PRIMARY_LIGHT_BLUE};
  text-decoration: underline;
`;

const RightP1 = P1.extend`
  text-align: right;
`;

const ItalicS1 = S1.extend`
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

  const { timestamp, name, id } = event;

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
          <EventDate>{format(timestamp, DATE_FORMAT)}</EventDate>
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
            as of date
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
