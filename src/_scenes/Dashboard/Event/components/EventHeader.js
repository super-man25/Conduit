// @flow
import * as React from 'react';
import { H1, H4, Flex, FlexItem, EDLink, P1, S1 } from '_components';
import { cssConstants } from '_constants';
import { format } from 'date-fns';
import { EDEvent } from '_models';
// import { formatNumber } from '_helpers/string-utils';

const DATE_FORMAT = 'dddd, MMMM Do, YYYY @ h:mmA';

const EventTitle = H1.extend`
  margin: 0;
  margin-bottom: 0.15rem;
`;

const EventDate = H4.extend`
  color: ${cssConstants.SECONDARY_BLUE};
  margin: 0;
  margin-bottom: 0.15rem;
`;

// const InventoryLink = S1.extend`
//   color: ${cssConstants.PRIMARY_LIGHT_BLUE};
//   text-decoration: underline;
// `;

// const ItalicS1 = S1.extend`
//   font-style: italic;
// `;

type Props = {
  event: EDEvent,
  availableInventory: number,
  totalInventory: number
};

// TODO: When Inventory list/Inventory totals are available we can add the commented out portions
export function EventHeader(props: Props) {
  const {
    event: { timestamp, name }
    // availableInventory,
    // totalInventory
  } = props;

  return (
    <Flex justify="space-between" align="flex-end">
      <FlexItem flex="0 0 auto" margin="0 auto 0 0">
        <EventTitle>{name}</EventTitle>
        <EventDate>{format(timestamp, DATE_FORMAT)}</EventDate>
        <EDLink to="#">
          {/* <InventoryLink color={cssConstants.PRIMARY_LIGHT_BLUE}>
            See Inventory List
          </InventoryLink> */}
        </EDLink>
      </FlexItem>
      {/* <FlexItem flex="0 0 auto">
        <P1 size="16px">Current Game Inventory</P1>
        <P1 size="22px" color={cssConstants.SECONDARY_BLUE}>
          {formatNumber(availableInventory)} / {formatNumber(totalInventory)}
        </P1>
        <ItalicS1 color={cssConstants.SECONDARY_BLUE}>
          Available / Total
        </ItalicS1>
      </FlexItem> */}
    </Flex>
  );
}
