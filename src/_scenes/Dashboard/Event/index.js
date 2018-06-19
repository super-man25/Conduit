// @flow
import { PageWrapper, Spacing, Breadcrumbs, Button, Flex } from '_components';
import React from 'react';
import { connect } from 'react-redux';
import { EventHeader } from './components/EventHeader';
import EventChart from './components/EventChart';
import { withSidebar } from '_hoc';
import { compose } from 'recompose';
import type { EDEvent } from '_models';
import { getActiveEvent } from '_state/event/selectors';

const ToggleButton = Button.extend`
  margin: 0;
  margin-right: 1rem;
`;

const createCrumbs = (event: EDEvent) => {
  return [{ title: 'Season Dashboard', path: '/season' }].concat({
    title: event.name,
    path: `/event/${event.id}`
  });
};

type Props = {
  event: ?EDEvent,
  toggleSidebar: () => void,
  isSidebarOpen: boolean
};

const Event = ({ event, toggleSidebar, isSidebarOpen }: Props) =>
  !!event && (
    <PageWrapper>
      <Spacing padding="1.5rem 2rem">
        <Flex align="center">
          {!isSidebarOpen && (
            <ToggleButton small expand onClick={toggleSidebar} />
          )}
          <Breadcrumbs crumbs={createCrumbs(event)} />
        </Flex>
        <Spacing height="1.5rem" />
        <EventHeader
          event={event}
          availableInventory={15000}
          totalInventory={40000}
        />
        <Spacing height="1rem" />
        <EventChart event={event} />
      </Spacing>
    </PageWrapper>
  );

function mapStateToProps(state) {
  return {
    event: getActiveEvent(state)
  };
}

export default compose(connect(mapStateToProps), withSidebar)(Event);
