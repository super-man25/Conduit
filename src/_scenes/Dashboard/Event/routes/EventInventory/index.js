// @flow
import React from 'react';
import { PageWrapper, Spacing, Box } from '_components';
import { connect } from 'react-redux';
import EventHeader from '../../components/EventHeader';
import type { EDEvent } from '_models';
import { getActiveEvent } from '_state/event/selectors';

type Props = {
  event: ?EDEvent
};

export const EventInventory = ({ event }: Props) =>
  !!event && (
    <PageWrapper>
      <Box padding="1.5rem 2rem">
        <EventHeader availableInventory={15000} totalInventory={40000} />
        <Spacing height="1rem" />
      </Box>
    </PageWrapper>
  );

function mapStateToProps(state) {
  return {
    event: getActiveEvent(state)
  };
}

export default connect(mapStateToProps)(EventInventory);
