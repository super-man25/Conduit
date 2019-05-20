// @flow
import React from 'react';
import { PageWrapper, Spacing, Box } from '_components';
import { connect } from 'react-redux';
import EventHeader from '../../components/EventHeader';
import EventChart from './components/EventChart';
import type { EDEvent } from '_models';
import { selectors } from '_state/event';
import { EventTicketIntegrations } from './components/EventTicketIntegrations';
import { EventPricing } from './components/EventPricing';

type Props = {
  event: ?EDEvent,
  isAdmin: boolean
};

export const EventOverview = ({ event, isAdmin }: Props) =>
  !!event && (
    <PageWrapper>
      <Box padding="1.5rem 2rem">
        <EventHeader availableInventory={15000} totalInventory={40000} />
        <Spacing height="1rem" />
        <EventChart />
        <Spacing height="2rem" />
        <EventTicketIntegrations id={event.id} />
        <Spacing height="2rem" />
        {isAdmin && <EventPricing event={event} isAdmin={isAdmin} />}
      </Box>
    </PageWrapper>
  );

function mapStateToProps(state) {
  return {
    event: selectors.selectEvent(state),
    isAdmin: state.auth.model.isAdmin
  };
}

export default connect(mapStateToProps)(EventOverview);
